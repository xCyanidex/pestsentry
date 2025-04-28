import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {recordsApiSlice} from "./slices/recordsSlice"

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [recordsApiSlice.reducerPath],
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    [recordsApiSlice.reducerPath]: recordsApiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }).concat(recordsApiSlice.middleware),
});

export const persistor = persistStore(store);
