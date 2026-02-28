import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import IZZIBS from './pages/IZZIBS';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
  // Add IZZIBS route
  // <Route path="/work/izzibs" element={<IZZIBS />} />
)
    // <Route path="/work/izzibs" element={<IZZIBS />} />
