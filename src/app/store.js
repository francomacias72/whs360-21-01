import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../features/clientSlice';

export default configureStore({
    reducer: {
        client: clientReducer,
    },
});