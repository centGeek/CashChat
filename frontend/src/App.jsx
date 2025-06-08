import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login'
import Dashboard from './pages/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App