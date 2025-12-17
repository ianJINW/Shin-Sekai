import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import Landing from './pages/Home';
import Layout from './components/Layout';
import Auth from './pages/auth';
import Animes from './pages/animes';
import Groups from './pages/groups';
import Group from './pages/group';
import Anime from './pages/anime';

function App() {

  const routes = [
    { path: '/register', element: <Auth mode='register' /> },
    { path: '/login', element: <Auth mode='login' /> },
    { path: '/anime', element: <Animes /> },
    { path: '/anime/:id', element: <Anime /> },
    { path: '/groups', element: <Groups /> },
    { path: '/groups/:id', element: <Group /> },
  ]
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path="/" element={
              <PageTransition>
                <Landing />
              </PageTransition>
            } />
            {routes.map((route) => (
              <Route path={route.path} element={
                <PageTransition>
                  {route.element}
                </PageTransition>} ></Route>
            ))}
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
