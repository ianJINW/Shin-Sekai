import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import { Home } from 'lucide-react';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
