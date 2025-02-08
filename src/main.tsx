import App from './App.tsx'
import ToastProvider from '@widgets/ToastProvider.tsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import MuiThemeProvider from '@context/MuiThemeContext/MuiThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MuiThemeProvider>
      <App />
      <ToastProvider />
    </MuiThemeProvider>
  </BrowserRouter>,
)
