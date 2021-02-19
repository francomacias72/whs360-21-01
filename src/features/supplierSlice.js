import { createSlice } from '@reduxjs/toolkit';

export const supplierSlice = createSlice({
    name: 'supplier',
    initialState: {
        listSuppliers: null,
        selectedSupplier: null,
        createSupplierIsOpen: false,
        editMode: false,
    },
    reducers: {
        fillListSuppliers: (state, action) => {
            state.listSuppliers = action.payload
        },
        selectSupplier: (state, action) => {
            state.selectedSupplier = action.payload
        },
        changeToEdit: (state) => {
            state.editMode = true;
        },
        changeToAdd: (state) => {
            state.editMode = false;
        },
        openCreateSupplier: (state) => {
            state.createSupplierIsOpen = true;
        },
        closeCreateSupplier: (state) => {
            state.createSupplierIsOpen = false;
        },
    },
});

export const {
    fillListSuppliers,
    selectSupplier,
    changeToEdit,
    changeToAdd,
    openCreateSupplier,
    closeCreateSupplier,
} = supplierSlice.actions;

export const selectListSuppliers = (state) => state.supplier.listSuppliers
export const selectOpenSupplier = (state) => state.supplier.selectedSupplier
export const selectEditMode = state => state.supplier.editMode
export const selectCreateSupplierIsOpen = (state) => state.supplier.createSupplierIsOpen

export default supplierSlice.reducer;