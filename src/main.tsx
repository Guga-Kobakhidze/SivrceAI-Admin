import App from './App.tsx'
import ToastProvider from '@widgets/ToastProvider.tsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from '@context/UserContext.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <UserProvider>
      <App />
      <ToastProvider />
    </UserProvider>
  </BrowserRouter>,
)
