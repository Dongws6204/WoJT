import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from "../src/ContextAPI/AuthContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Provider>
)
