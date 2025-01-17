import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LoginProvider } from './context/loginContext.tsx';
import { Shoping } from './context/shopingCardContext.tsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';


const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif'
  },
});


createRoot(document.getElementById('root')!).render(
  <LoginProvider>
    <Shoping>
      <StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StrictMode>

    </Shoping>
  </LoginProvider>
)
