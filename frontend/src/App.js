import React from 'react'
import LandingPage from './Components/LandingPage/LandingPage'
import { Switch, Route, RouterBrowser as Router } from 'react-router-dom'
import Navbar from './Components/Navbar'


const Routing = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Navbar />
      </Route>
      <Route exact path='/landing'>
        <LandingPage />
      </Route>
    </Switch>
  )
}

const App = () => {
  return (
    <>
      {/* <Routing /> */}
      <LandingPage />
    </>
  )
}

export default App
