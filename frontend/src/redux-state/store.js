import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
 } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import storyBookReducer from '../components/story-book/storyBookSlice'
import storyBookSysInfoReducer from "../components/Pages/create-stories-page/storyBookSysInfoSlice";

import { combineReducers } from '@reduxjs/toolkit';
import rootReducer from './reducers';
// import { version } from 'mongoose';

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// };

const storyBookPersistConfig = {
  key: 'storyBookData',
  version: 1,
  storage,
}

const sysInfoPersistConfig = {
  key: 'sysInfoData',
  version: 1,
  storage,
}

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const persistedReducer = combineReducers({
  storyBook: persistReducer(storyBookPersistConfig, storyBookReducer),
  storyBookSysInfo: persistReducer(sysInfoPersistConfig, storyBookSysInfoReducer),
})

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const clearReduxPersist = () => {
  persistor.purge()
}

export const clearStoryBookPersist = async () => {
  await localStorage.removeItem('persist:storyBook');
};

export const clearSPersist = () => {
  localStorage.removeItem('persist:storyBook');
};

export const persistor = persistStore(store);