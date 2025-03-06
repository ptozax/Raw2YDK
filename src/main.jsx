import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App.jsx'
import R2t from './raw_to_ydk/r2t.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <R2t />
  </StrictMode>,
)
