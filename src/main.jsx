import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'flowbite';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext'
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <RecoilRoot>
          <App/>
        </RecoilRoot>
      </AuthContextProvider>
		</BrowserRouter>
  </React.StrictMode>,
)
