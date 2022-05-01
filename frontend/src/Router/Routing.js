import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation
} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Admin from '../Components/Admin/Admin'
import LandingPage from '../Components/LandingPage/LandingPage'
import NotFound from '../Components/NotFound 404/NotFound'
import Success from '../Components/Success/Success'
import Login from '../Components/Login/Login'
import AdminLogin from '../Components/Login/AdminLogin'
import Signup from '../Components/Signup/Signup'

const Routing = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/admin/access/bus' component={Admin} />
          <Route path='/success' component={Success} />

          <ProtectedRoute exact path='/login' component={Login} />
          <ProtectedRoute exact path='/signup' component={Signup} />
          <ProtectedRoute path='/' component={LandingPage} />
          <Route path='/notfound' component={NotFound} />
          {/* <ProtectedRoute
            exact
            path='/forgot-password'
            component={ForgotPassword}
          />
          <ProtectedRoute
            exact
            path='/reset-password'
            component={ResetPassword}
          /> */}
        </Switch>
      </Router>
    </>
  )
}

function ProtectedRoute (props) {
  const { currentUser } = useAuth()
  const { path } = props
  const location = useLocation()

  if (
    path === '/login' ||
    path === '/signup' ||
    path === '/forgot-password' ||
    path === '/reset-password'
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/'} />
    ) : (
      <Route {...props} />
    )
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: path }
      }}
    />
  )
}

export default Routing
