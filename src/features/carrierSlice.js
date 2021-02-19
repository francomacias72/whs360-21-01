import { createSlice } from '@reduxjs/toolkit';

export const carrierSlice = createSlice({
    name: 'carrier',
    initialState: {
        listCarriers: null,
        selectedCarrier: null,
        createCarrierIsOpen: false,
        editMode: false,
    },
    reducers: {
        fillListCarriers: (state, action) => {
            state.listCarriers = action.payload
        },
        selectCarrier: (state, action) => {
            state.selectedCarrier = action.payload
        },
        changeToEdit: (state) => {
            state.editMode = true;
        },
        changeToAdd: (state) => {
            state.editMode = false;
        },
        openCreateCarrier: (state) => {
            state.createCarrierIsOpen = true;
        },
        closeCreateCarrier: (state) => {
            state.createCarrierIsOpen = false;
        },
    },
});

export const {
    fillListCarriers,
    selectCarrier,
    changeToEdit,
    changeToAdd,
    openCreateCarrier,
    closeCreateCarrier,
} = carrierSlice.actions;

export const selectListCarriers = (state) => state.carrier.listCarriers
export const selectOpenCarrier = (state) => state.carrier.selectedCarrier
export const selectEditMode = state => state.carrier.editMode
export const selectCreateCarrierIsOpen = (state) => state.carrier.createCarrierIsOpen

export default carrierSlice.reducer;