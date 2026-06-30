import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DeepWorkScoreboard from './DeepWorkScoreboard.jsx'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const pathname = window.location.pathname
  .slice(basePath.length)
  .replace(/\/+$/, '') || '/'
const rootPage = pathname === '/deep-work-scoreboard' ? <DeepWorkScoreboard /> : <App />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {rootPage}
  </StrictMode>,
)
