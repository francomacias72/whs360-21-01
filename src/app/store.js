import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../features/clientSlice';
import partReducer from '../features/partSlice';
import whsReducer from '../features/whsSlice';
import zoneReducer from '../features/zoneSlice';
import receiptReducer from '../features/receiptSlice';
import userReducer from '../features/userSlice';


export default configureStore({
    reducer: {
        client: clientReducer,
        part: partReducer,
        whs: whsReducer,
        zone: zoneReducer,
        receipt: receiptReducer,
        user: userReducer,
    },
});