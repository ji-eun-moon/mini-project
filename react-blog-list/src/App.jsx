import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

// components
import NavBar from './components/NavBar';

// pages
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ListPage from './pages/ListPage';

// routes
import routes from './routes';


function App() {

  return (
    <Router>
      <NavBar/>

      <div className='container mt-3'>
        <Routes>
          {routes.map((route) => {
            return <Route key={route.path} path={route.path} element={route.element} />
          })}
        </Routes>
      </div>
    </Router>
  )
}

export default App;