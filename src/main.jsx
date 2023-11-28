/**
 * -------------------------------------------------------------------------------
 * © 2023 RedVelvet All Rights Reserved
 * -------------------------------------------------------------------------------
 *
 * Author : <re@redvelvet.me> (https://redvelvet.me)
 * GitHub : https://github.com/monikaquentin
 * GitLab : https://gitlab.com/monikaquentin
 *
 */

import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/i18n'
import '@/index.scss'

import App from '@/App'

import { Provider } from 'react-redux'
import { persistor, store } from '@/app/store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('redvelvet')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
