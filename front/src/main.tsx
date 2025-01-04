import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LoginProvider } from './context/loginContext.tsx';



createRoot(document.getElementById('root')!).render(
  <LoginProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </LoginProvider>
)
