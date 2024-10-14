import { ofType, Epic } from 'redux-observable';
import { Action } from 'redux';
import { mergeMap, catchError } from 'rxjs/operators';
import { merge, of, from } from 'rxjs';
import {
    fetchServicesStart,
    fetchServicesSuccess,
    fetchServicesError,
    fetchServiceDetailsStart,
    fetchServiceDetailsSuccess,
    fetchServiceDetailsError,
} from './reducers';
import { State } from './reducers'; 
import { Service } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchServicesEpic: Epic<Action> = (action$) => 
  action$.pipe(
    ofType(fetchServicesStart.type),
    mergeMap(() =>
      from(fetch(API_URL).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })).pipe(
        mergeMap((data: Service[]) => {
          return of(fetchServicesSuccess(data));
        }),
        catchError(error => {
          console.error('Error fetching services: ', error);
          return of(fetchServicesError());
        })
      )
    )
  );

export const fetchServiceDetailsEpic: Epic<Action> = (action$) => 
    action$.pipe(
      ofType(fetchServiceDetailsStart.type),
      mergeMap((action: ReturnType<typeof fetchServiceDetailsStart>) =>
        from(fetch(`${API_URL}/${action.payload}`).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })).pipe(
          mergeMap((data: Service) => {
            // console.log('fetchServiceDetailsEpic data', data);
            return of(fetchServiceDetailsSuccess(data));
          }),
          catchError(error => {
            console.error('Error fetching service details:', error);
            return of(fetchServiceDetailsError());
          })
        )
      )
    );

export const rootEpic: Epic<Action, Action, State> = (action$, state$) => {
    return merge(
      fetchServicesEpic(action$, state$),
      fetchServiceDetailsEpic(action$, state$)
    );
};
