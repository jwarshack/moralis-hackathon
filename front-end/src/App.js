import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Box } from '@chakra-ui/react'

function App() {
  return (
    <Box p={10}>
      <Navbar/>
    </Box>
    
  );
}

export default App;
