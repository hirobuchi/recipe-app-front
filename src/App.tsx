import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import FrontVar from './components/common/FrontVar'
import Ranking from './components/pages/Ranking'
import New from './components/pages/New'
import Search from './components/pages/Search'
import Login from './components/pages/Login'
import NotFound from './components/pages/NotFound'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <FrontVar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/ranking" element={<ProtectedRoute><Ranking /></ProtectedRoute>} />
        <Route path="/new" element={<ProtectedRoute><New /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
