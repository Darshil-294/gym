import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootReducers} from './reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducers = persistReducer(persistConfig, rootReducers);
export const store = createStore(persistedReducers, applyMiddleware(thunk));
export const persistor = persistStore(store);
