import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        selectedClient: null,
        createClientIsOpen: false,
        editMode: false,
    },
    reducers: {
        selectClient: (state, action) => {
            state.selectedClient = action.payload
        },
        changeToEdit: (state) => {
            state.editMode = true;
        },
        changeToAdd: (state) => {
            state.editMode = false;
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
    changeToEdit,
    changeToAdd,
    openCreateClient,
    closeCreateClient,
} = clientSlice.actions;

export const selectOpenClient = (state) => state.client.selectedClient
export const selectEditMode = state => state.client.editMode
export const selectCreateClientIsOpen = (state) => state.client.createClientIsOpen

export default clientSlice.reducer;