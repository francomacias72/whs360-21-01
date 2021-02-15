import { createSlice } from '@reduxjs/toolkit';

export const partSlice = createSlice({
    name: 'part',
    initialState: {
        listParts: null,
        selectedPart: null,
        createPartIsOpen: false,
        editModeP: false,
    },
    reducers: {
        fillListParts: (state, action) => {
            state.listParts = action.payload
        },
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
    fillListParts,
    selectPart,
    changeToEditP,
    changeToAddP,
    openCreatePart,
    closeCreatePart,
} = partSlice.actions;

export const selectListParts = (state) => state.part.listParts
export const selectOpenPart = (state) => state.part.selectedPart
export const selectEditModeP = state => state.part.editModeP
export const selectCreatePartIsOpen = (state) => state.part.createPartIsOpen

export default partSlice.reducer;