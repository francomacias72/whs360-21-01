import { createSlice } from '@reduxjs/toolkit';

export const whsSlice = createSlice({
    name: 'whs',
    initialState: {
        listWhss: null,
        selectedWhs: null,
        selectedWhsMain: null,
        createWhsIsOpen: false,
        editMode: false,
    },
    reducers: {
        fillListWhss: (state, action) => {
            state.listWhss = action.payload
        },
        selectWhs: (state, action) => {
            state.selectedWhs = action.payload
        },
        selectWhsMain: (state, action) => {
            state.selectedWhsMain = action.payload
        },
        changeToEditW: (state) => {
            state.editMode = true;
        },
        changeToAddW: (state) => {
            state.editMode = false;
        },
        openCreateWhs: (state) => {
            state.createWhsIsOpen = true;
        },
        closeCreateWhs: (state) => {
            state.createWhsIsOpen = false;
        },
    },
});

export const {
    fillListWhss,
    selectWhs,
    selectWhsMain,
    changeToEditW,
    changeToAddW,
    openCreateWhs,
    closeCreateWhs,
} = whsSlice.actions;

export const selectListWhss = (state) => state.whs.listWhss
export const selectOpenWhs = (state) => state.whs.selectedWhs
export const selectOpenWhsMain = (state) => state.whs.selectedWhsMain
export const selectEditMode = state => state.whs.editMode
export const selectCreateWhsIsOpen = (state) => state.whs.createWhsIsOpen

export default whsSlice.reducer;