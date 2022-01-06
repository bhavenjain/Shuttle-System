import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from '../Components/Admin/Admin'
import LandingPage from '../Components/LandingPage/LandingPage'
import NotFound from '../Components/NotFound 404/NotFound'

const Routing = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <>
                <LandingPage />
              </>
            }
          />
          <Route
            path='/admin/access/bus'
            element={
              <>
                <Admin />
              </>
            }
          />

          <Route
            path='/notfound'
            element={
              <>
                <NotFound />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default Routing
