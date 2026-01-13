import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { toast, Toaster } from 'sonner'

import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import Landing from './pages/Home';
import Layout from './components/Layout';
import Auth from './pages/auth';
import Animes from './pages/animes';
import Groups from './pages/groups';
import Group from './pages/group';
import Anime from './pages/anime';
import Me from './pages/me';
import { type FC } from 'react';
import GroupInfo from './components/info';
import useSocket from './hooks/useSocket';

const App: FC = () => {

  useSocket('apihit', () => {
    toast.info('Connected.')
  })

  const routes = [
    { path: '/register', element: <Auth mode='register' /> },
    { path: '/login', element: <Auth mode='login' /> },
    { path: '/logout', element: <Auth mode='login' /> },
    { path: '/anime', element: <Animes /> },
    { path: '/anime/:id', element: <Anime /> },
    { path: '/groups', element: <Groups /> },
    { path: '/groups/:id', element: <Group /> },
    { path: '/groups/info/:id', element: <GroupInfo /> },
    { path: '/profile', element: <Me /> },
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
          <Route path="*" element={<div>404: No route matched</div>} />
        </Routes>
      </Router>
      <Toaster position='top-right' />
    </>
  )
}

export default App
