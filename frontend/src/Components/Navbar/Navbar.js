import React from 'react'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  return (
    <div className='navbar'>
      <img
        src='https://snulinks.snu.edu.in/img/snu-logo.png'
        alt='SNU Logo'
        className='navbar__logo'
      />
      {currentUser && <button className="navbar__signout" onClick={logout}>Sign Out</button>}
    </div>
  )
}

export default Navbar
