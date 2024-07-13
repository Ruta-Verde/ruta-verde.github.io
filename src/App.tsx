import './App.css'
import './styles/global.css';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider>
      <Box sx={{ width: "100%", height: "auto"}}>
        <Router>
          <Header />
          <Flex position="relative">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />} />
            </Routes>
          </Flex>
          <Footer />
        </Router>
      </Box>
    </ChakraProvider>
  );
};

export default App
