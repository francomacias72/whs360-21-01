import { createSlice } from '@reduxjs/toolkit';

export const partSlice = createSlice({
    name: 'part',
    initialState: {
        selectedPart: null,
        createPartIsOpen: false,
        editMode: false,
    },
    reducers: {
        selectPart: (state, action) => {
            state.selectedPart = action.payload
        },
        changeToEdit: (state) => {
            state.editMode = true;
        },
        changeToAdd: (state) => {
            state.editMode = false;
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
    changeToEdit,
    changeToAdd,
    openCreatePart,
    closeCreatePart,
} = partSlice.actions;

export const selectOpenPart = (state) => state.part.selectedPart
export const selectEditMode = state => state.part.editMode
export const selectCreatePartIsOpen = (state) => state.part.createPartIsOpen

export default partSlice.reducer;