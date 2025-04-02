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

import storyBookReducer from '../components/CreateStoryPageParts/story-book-create/storyBookSlice'
import storyBookSysInfoReducer from "../components/Pages/create-stories-page/storyBookSysInfoSlice";
import systemInfoReducer from "../components/app/systemInfoSlice"

import { combineReducers } from '@reduxjs/toolkit';

const storyBookPersistConfig = {
  key: 'storyBookData',
  version: 1,
  storage,
}

const storyBookSysInfoPersistConfig = {
  key: 'storyBooksysInfoData',
  version: 1,
  storage,
}

const systemInfoPersistConfig = {
  key: 'systemInfoData',
  version: 1,
  storage,
}

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const persistedReducer = combineReducers({
  storyBook: persistReducer(storyBookPersistConfig, storyBookReducer),
  storyBookSysInfo: persistReducer(storyBookSysInfoPersistConfig, storyBookSysInfoReducer),
  systemInfo: persistReducer(systemInfoPersistConfig, systemInfoReducer)
})

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devtools: process.env.NODE_ENV === 'development',
});

export const clearStoryBookPersist = async () => {
  localStorage.removeItem('persist:storyBookData');
};

export const clearStoryBookSysInfoPersist = () => {
  localStorage.removeItem('persist:storyBookSysInfo');
};

export const clearReduxPersist = () => {
  clearStoryBookPersist()
  clearStoryBookSysInfoPersist()
}

export const persistor = persistStore(store);