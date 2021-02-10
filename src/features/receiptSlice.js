import { createSlice } from '@reduxjs/toolkit';

export const receiptSlice = createSlice({
    name: 'receipt',
    initialState: {
        savedReceipt: null,
        orderId: 0,
    },
    reducers: {
        saveReceipt: (state, action) => {
            state.savedReceipt = action.payload
        },
        saveOrderId: (state, action) => {
            state.orderId = action.payload
        },
    },
});

export const {
    saveReceipt,
    saveOrderId,
} = receiptSlice.actions;

export const getSavedReceipt = state => state.receipt.savedReceipt
export const selectOrderId = state => state.receipt.orderId
// export const selectCreateClientIsOpen = (state) => state.client.createClientIsOpen

export default receiptSlice.reducer;