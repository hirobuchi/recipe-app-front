import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import FrontVar from './components/common/FrontVar'
import Ranking from './components/pages/Ranking'
import New from './components/pages/New'
import Search from './components/pages/Search'
import Login from './components/pages/Login'
import NotFound from './components/pages/NotFound'


function App() {

  return (
    <BrowserRouter>
      <FrontVar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/new" element={<New />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
