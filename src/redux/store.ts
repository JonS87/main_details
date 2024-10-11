import { Action, configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epic';
import { rootReducer } from './reducers';
import { State } from './reducers';

const epicMiddleware = createEpicMiddleware<Action, Action, State>();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export default store;
