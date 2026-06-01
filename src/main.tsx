import { createRoot, type Root } from 'react-dom/client'
import App from './App'
import './styles.css'

declare global {
  interface Window {
    __portfolioRoot?: Root
  }
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

const root = window.__portfolioRoot ?? createRoot(rootElement)
window.__portfolioRoot = root
root.render(<App />)
