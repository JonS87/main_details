import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from '../types';

export interface State {
    services: Service[];
    loading: boolean;
    error: boolean;
    selectedService?: Service;
}

const initialState: State = {
    services: [],
    loading: false,
    error: false,
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        fetchServicesStart(state) {
            state.loading = true;
            state.error = false;
        },
        fetchServicesSuccess(state, action: PayloadAction<Service[]>) {
            state.services = action.payload;
            state.loading = false;
            state.error = false;
        },
        fetchServicesError(state) {
            state.loading = false;
            state.error = true;
        },
        fetchServiceDetailsStart(state) {
            state.loading = true;
            state.error = false;
        },
        fetchServiceDetailsSuccess(state, action: PayloadAction<Service>) {
            state.selectedService = action.payload;
            state.loading = false;
            state.error = false;
        },
        fetchServiceDetailsError(state) {
            state.loading = false;
            state.error = true;
        },
    },
});

export const {
    fetchServicesStart,
    fetchServicesSuccess,
    fetchServicesError,
    fetchServiceDetailsStart,
    fetchServiceDetailsSuccess,
    fetchServiceDetailsError,
} = servicesSlice.actions;

export const rootReducer = servicesSlice.reducer;

export type RootState = ReturnType<typeof rootReducer>;
