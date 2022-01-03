import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from '../Components/Admin/Admin'
import LandingPage from '../Components/LandingPage/LandingPage'

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
        </Routes>
      </Router>
    </>
  )
}

export default Routing
