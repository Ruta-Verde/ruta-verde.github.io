import './App.css'
import './styles/global.css';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './components/Home.tsx';
import About from './components/About.tsx';
import Slideshow from './components/Slideshow.tsx'
import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const images = [
    'https://creature-companions.in/wp-content/uploads/2024/02/Exploring-the-Fascinating-World-of-Cat-Breeds_-A-Guide-for-Indian-Cat-Lovers-1080x400.png',
    'https://creature-companions.in/wp-content/uploads/2024/03/Purrfect-Pals-for-Indian-Homes_-Top-Cat-Breeds-That-Thrive-in-Our-Climate-1080x400.png',
    'https://www.valleyvet.com/library/article-si_cat_vaccine.jpg',
  ];

  return (
    <ChakraProvider>
      <Router>
        <Box sx={{ width: "100%", height: "auto", p: 0, m: 0}}>
          <Header />
          <Slideshow images={images} />
          <Box flex="1" position="relative" zIndex="2" backgroundColor="rgba(255, 255, 255, 0.8)">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App
