# Buat folder src jika belum ada
New-Item -ItemType Directory -Force -Path .\src

# Buat file main.jsx
@'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
'@ | Out-File -FilePath .\src\main.jsx -Encoding utf8