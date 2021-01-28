import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../features/clientSlice';
import partReducer from '../features/partSlice';


export default configureStore({
    reducer: {
        client: clientReducer,
        part: partReducer,
    },
});