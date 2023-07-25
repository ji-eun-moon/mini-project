import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

// components
import BlogForm from './components/BlogForm';
import NavBar from './components/NavBar';

// routes
import routes from './routes';


function App() {

  return (
    <Router>
      <NavBar/>

      <div className='container'>
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