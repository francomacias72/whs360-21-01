import { createSlice } from '@reduxjs/toolkit';

export const zoneSlice = createSlice({
    name: 'zone',
    initialState: {
        listZones: null,
        selectedZone: null,
        createZoneIsOpen: false,
        editModeZ: false,
    },
    reducers: {
        fillListZones: (state, action) => {
            state.listZones = action.payload
        },
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
    fillListZones,
    selectZone,
    changeToEditZ,
    changeToAddZ,
    openCreateZone,
    closeCreateZone,
} = zoneSlice.actions;

export const selectListZones = (state) => state.zone.listZones
export const selectOpenZone = (state) => state.zone.selectedZone
export const selectEditModeZ = state => state.zone.editModeZ
export const selectCreateZoneIsOpen = (state) => state.zone.createZoneIsOpen

export default zoneSlice.reducer;