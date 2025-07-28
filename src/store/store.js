import { configureStore } from '@reduxjs/toolkit';
import chickensReducer from './chickensSlice';
import remindersReducer from './remindersSlice';
import unitsReducer from './unitsSlice';
import dateFormatReducer from './dateFormatSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  chickens: chickensReducer,
  reminders: remindersReducer,
  units: unitsReducer,
  dateFormat: dateFormatReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
