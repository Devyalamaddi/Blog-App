import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import App from './App.jsx'
import './index.css'
import UserContext from './Context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <App/>
    </UserContext>
  </StrictMode>,
)
