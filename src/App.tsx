/**
 * App.updated.tsx
 *
 * Drop-in replacement for App.tsx.
 * New: nested /dashboard/* routes protected by RouteGuard,
 * rendered inside DashboardLayout via <Outlet />.
 *
 * Route tree:
 *
 *   /dashboard                       → redirect to /dashboard/impact
 *   /dashboard/impact                → MyRutaImpact        (all roles)
 *   /dashboard/events                → DashboardEvents     (admin | event-organizer)
 *   /dashboard/events/create         → CreateEvent         (admin | event-organizer)
 *   /dashboard/blog                  → DashboardBlog       (admin)
 *
 * RouteGuard sits INSIDE DashboardLayout's children, so the sidebar
 * still renders even when access is denied (before the redirect fires).
 * If you want a hard 404 instead of a redirect, swap <Navigate> in RouteGuard.
 *
 * Why Navigate at /dashboard?
 *   The old /dashboard route was a single page.  We need a sensible default
 *   for anyone who bookmarked it — /impact is the universal landing.
 */

import './App.css'
import './styles/global.css'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Projects from './pages/Projects.tsx'
import SingleEventPage from './pages/SingleEventPage.tsx'
import Events from './pages/Events.tsx'
import Blog from './pages/Blog.tsx'
import BlogPage from './pages/BlogPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import GetInvolved from './pages/GetInvolved.tsx'
import DashboardLayout from './components/dashboard/DashboardLayout.tsx'
import RutaImpact from './pages/dashboard/RutaImpact.tsx'
import DashboardEvents from './pages/dashboard/EventsDashboard.tsx'
import CreateEvent from './pages/dashboard/CreateEvent.tsx'
import BlogDashboard from './pages/dashboard/BlogDashboard.tsx'
import RouteGuard from './components/RouteGuard.tsx'

import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import theme from './theme.tsx'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box sx={{ width: '100%', height: 'auto' }}>
        <Router>
          <Header />
          <Flex position="relative">
            <Routes>
              <Route path="/"              element={<Home />} />
              <Route path="/about"         element={<About />} />
              <Route path="/projects"      element={<Projects />} />
              <Route path="/loginpage"     element={<LoginPage />} />
              <Route path="/getinvolved"   element={<GetInvolved />} />
              <Route path="/events"        element={<Events />} />
              <Route path="/events/:id"    element={<SingleEventPage />} />
              <Route path="/blog"          element={<Blog />} />
              <Route path="/blog/:slug"    element={<BlogPage />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate to="impact" replace />} />
                <Route
                  path="impact"
                  element={
                    <RouteGuard allowed={['admin', 'event-organizer', 'volunteer']}>
                      <RutaImpact />
                    </RouteGuard>
                  }
                />
                <Route
                  path="events"
                  element={
                    <RouteGuard allowed={['admin', 'event-organizer']}>
                      <DashboardEvents />
                    </RouteGuard>
                  }
                />
                <Route
                  path="events/create"
                  element={
                    <RouteGuard allowed={['admin', 'event-organizer']}>
                      <CreateEvent />
                    </RouteGuard>
                  }
                />
                <Route
                  path="blog"
                  element={
                    <RouteGuard allowed={['admin']}>
                      <BlogDashboard />
                    </RouteGuard>
                  }
                />
              </Route>
            </Routes>
          </Flex>
          <Footer />
        </Router>
      </Box>
    </ChakraProvider>
  )
}

export default App