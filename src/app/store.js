import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../features/clientSlice';
import partReducer from '../features/partSlice';
import whsReducer from '../features/whsSlice';
import zoneReducer from '../features/zoneSlice';
import receiptReducer from '../features/receiptSlice';


export default configureStore({
    reducer: {
        client: clientReducer,
        part: partReducer,
        whs: whsReducer,
        zone: zoneReducer,
        receipt: receiptReducer,
    },
});