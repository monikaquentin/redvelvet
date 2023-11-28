import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import _attributes from '@/features/attributes/slice'

import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

export const store = configureStore({
  reducer: {
    attributes: persistReducer({ key: 'attributes', storage }, _attributes)
  },
  devTools: import.meta.env.VITE_APP_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)
