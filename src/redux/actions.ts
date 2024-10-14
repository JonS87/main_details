import { Service } from '../types';

export const FETCH_SERVICES = 'FETCH_SERVICES';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_ERROR = 'FETCH_SERVICES_ERROR';
export const FETCH_SERVICE_DETAILS = 'FETCH_SERVICE_DETAILS';
export const FETCH_SERVICE_DETAILS_SUCCESS = 'FETCH_SERVICE_DETAILS_SUCCESS';
export const FETCH_SERVICE_DETAILS_ERROR = 'FETCH_SERVICE_DETAILS_ERROR';

export const fetchServicesStart = () => ({ type: FETCH_SERVICES });
export const fetchServicesSuccess = (services: Service[]) => ({ type: FETCH_SERVICES_SUCCESS, payload: services });
export const fetchServicesError = () => ({ type: FETCH_SERVICES_ERROR });
export const fetchServiceDetailsStart = (id: number) => ({ type: FETCH_SERVICE_DETAILS, payload: id });
export const fetchServiceDetailsSuccess = (service: Service) => ({ type: FETCH_SERVICE_DETAILS_SUCCESS, payload: service });
export const fetchServiceDetailsError = () => ({ type: FETCH_SERVICE_DETAILS_ERROR });
