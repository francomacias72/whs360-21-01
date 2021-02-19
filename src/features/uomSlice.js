import { createSlice } from '@reduxjs/toolkit';

export const uomSlice = createSlice({
    name: 'uom',
    initialState: {
        listUoms: null,
        selectedUom: null,
        createUomIsOpen: false,
        editMode: false,
    },
    reducers: {
        fillListUoms: (state, action) => {
            state.listUoms = action.payload
        },
        selectUom: (state, action) => {
            state.selectedUom = action.payload
        },
        changeToEdit: (state) => {
            state.editMode = true;
        },
        changeToAdd: (state) => {
            state.editMode = false;
        },
        openCreateUom: (state) => {
            state.createUomIsOpen = true;
        },
        closeCreateUom: (state) => {
            state.createUomIsOpen = false;
        },
    },
});

export const {
    fillListUoms,
    selectUom,
    changeToEdit,
    changeToAdd,
    openCreateUom,
    closeCreateUom,
} = uomSlice.actions;

export const selectListUoms = (state) => state.uom.listUoms
export const selectOpenUom = (state) => state.uom.selectedUom
export const selectEditMode = state => state.uom.editMode
export const selectCreateUomIsOpen = (state) => state.uom.createUomIsOpen

export default uomSlice.reducer;