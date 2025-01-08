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