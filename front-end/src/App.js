import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Purchase from './components/Purchase';
import Redeem from './components/Redeem';
import { Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Box p={10}>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Purchase/>}/>
          <Route path="/redeem" element={<Redeem/>}/>

        </Routes>
          
      </Box>
    </Router>

    
  );
}

export default App;
