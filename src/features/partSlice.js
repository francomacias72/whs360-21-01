import { createSlice } from '@reduxjs/toolkit';

export const partSlice = createSlice({
    name: 'part',
    initialState: {
        selectedPart: null,
        createPartIsOpen: false,
        editModeP: false,
    },
    reducers: {
        selectPart: (state, action) => {
            state.selectedPart = action.payload
        },
        changeToEditP: (state) => {
            state.editModeP = true;
        },
        changeToAddP: (state) => {
            state.editModeP = false;
        },
        openCreatePart: (state) => {
            state.createPartIsOpen = true;
        },
        closeCreatePart: (state) => {
            state.createPartIsOpen = false;
        },
    },
});

export const {
    selectPart,
    changeToEditP,
    changeToAddP,
    openCreatePart,
    closeCreatePart,
} = partSlice.actions;

export const selectOpenPart = (state) => state.part.selectedPart
export const selectEditModeP = state => state.part.editModeP
export const selectCreatePartIsOpen = (state) => state.part.createPartIsOpen

export default partSlice.reducer;