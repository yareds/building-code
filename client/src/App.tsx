import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import Navbar from './components/Navbar'
import BuildingCodeList from './components/BuildingCodeList'
import BuildingCodeForm from './components/BuildingCodeForm'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<BuildingCodeList />} />
            <Route path="/add" element={<BuildingCodeForm />} />
            <Route path="/edit/:id" element={<BuildingCodeForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  )
}

export default App