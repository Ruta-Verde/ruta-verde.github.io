import './App.css'
import './styles/global.css';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Donate from './pages/Donate.tsx';
import SingleEventPage from './pages/SingleEventPage.tsx';
import Events from './pages/Events.tsx';
import BlogPage from './components/BlogPage.tsx'
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme.tsx'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box sx={{ width: "100%", height: "auto"}}>
        <Router>
          <Header />
          <Flex position="relative">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />} />
                <Route path="/donate" element={<Donate />}/>
                <Route path="/events" element={<Events />}/>
                <Route path="/events/:slug" element={<SingleEventPage />}/>
                <Route path="/blogtest" element={<BlogPage />}/>
            </Routes>
          </Flex>
          <Footer />
        </Router>
      </Box>
    </ChakraProvider>
  );
};

export default App
