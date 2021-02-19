import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../features/clientSlice';
import partReducer from '../features/partSlice';
import whsReducer from '../features/whsSlice';
import zoneReducer from '../features/zoneSlice';
import receiptReducer from '../features/receiptSlice';
import userReducer from '../features/userSlice';
import carrierReducer from '../features/carrierSlice';
import supplierReducer from '../features/supplierSlice';
import uomReducer from '../features/uomSlice';


export default configureStore({
    reducer: {
        client: clientReducer,
        part: partReducer,
        whs: whsReducer,
        zone: zoneReducer,
        receipt: receiptReducer,
        user: userReducer,
        carrier: carrierReducer,
        supplier: supplierReducer,
        uom: uomReducer,
    },
});