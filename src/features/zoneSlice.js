import { createSlice } from '@reduxjs/toolkit';

export const zoneSlice = createSlice({
    name: 'zone',
    initialState: {
        selectedZone: null,
        createZoneIsOpen: false,
        editModeZ: false,
    },
    reducers: {
        selectZone: (state, action) => {
            state.selectedZone = action.payload
        },
        changeToEditZ: (state) => {
            state.editModeZ = true;
        },
        changeToAddZ: (state) => {
            state.editModeZ = false;
        },
        openCreateZone: (state) => {
            state.createZoneIsOpen = true;
        },
        closeCreateZone: (state) => {
            state.createZoneIsOpen = false;
        },
    },
});

export const {
    selectZone,
    changeToEditZ,
    changeToAddZ,
    openCreateZone,
    closeCreateZone,
} = zoneSlice.actions;

export const selectOpenZone = (state) => state.zone.selectedZone
export const selectEditModeZ = state => state.zone.editModeZ
export const selectCreateZoneIsOpen = (state) => state.zone.createZoneIsOpen

export default zoneSlice.reducer;