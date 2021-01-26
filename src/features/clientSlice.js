import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        selectedClient: null,
        createClientIsOpen: false,
    },
    reducers: {
        selectClient: (state, action) => {
            state.selectedClient = action.payload
        },
        openCreateClient: (state) => {
            state.createClientIsOpen = true;
        },
        closeCreateClient: (state) => {
            state.createClientIsOpen = false;
        },
    },
});

export const {
    selectClient,
    openCreateClient,
    closeCreateClient,
} = clientSlice.actions;

export const selectOpenClient = (state) => state.client.selectedClient
export const selectCreateClientIsOpen = (state) => state.client.createClientIsOpen

export default clientSlice.reducer;