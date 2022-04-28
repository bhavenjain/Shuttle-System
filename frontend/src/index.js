import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store/store'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import AuthContextProvider from './context/AuthContext'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
reportWebVitals()
