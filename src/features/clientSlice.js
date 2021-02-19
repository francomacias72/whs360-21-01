import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        listClients: null,
        selectedClient: null,
        selectedClientMain: null,
        createClientIsOpen: false,
        editMode: false,
    },
    reducers: {
        fillListClients: (state, action) => {
            state.listClients = action.payload
        },
        selectClient: (state, action) => {
            state.selectedClient = action.payload
        },
        selectClientMain: (state, action) => {
            state.selectedClientMain = action.payload
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
    fillListClients,
    selectClient,
    selectClientMain,
    changeToEdit,
    changeToAdd,
    openCreateClient,
    closeCreateClient,
} = clientSlice.actions;

export const selectListClients = (state) => state.client.listClients
export const selectOpenClientMain = (state) => state.client.selectedClientMain
export const selectOpenClient = (state) => state.client.selectedClient
export const selectEditMode = state => state.client.editMode
export const selectCreateClientIsOpen = (state) => state.client.createClientIsOpen

export default clientSlice.reducer;