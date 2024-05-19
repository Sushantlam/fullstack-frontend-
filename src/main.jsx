import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/Auth.jsx'
import { DarkContextProvider } from './Context/Button.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <DarkContextProvider>
   <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </DarkContextProvider>
  </React.StrictMode>,
)
