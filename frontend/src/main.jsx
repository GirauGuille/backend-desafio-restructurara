import React from 'react'
import ReactDOM from 'react-dom/client'
/* import NavBar from './components/NavBar' */
import App from './App.jsx'
/* import Footer from './components/Footer' */
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <App />
{/*     <Footer /> */}
  </React.StrictMode>,
)
