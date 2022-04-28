import React, { useState } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useAuth } from '../../context/AuthContext'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import styles from './Login.module.css'

const Login = () => {
  // General
  const history = useHistory()
  const location = useLocation()


  // Firestore initialilzing
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  const { login } = useAuth()

  // States
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState(false)
  const [password, setPassword] = useState(false)

  // Email Field
  const changeEmail = e => setEmail(e.target.value)

  // Password Field
  const changePassword = e => setPassword(e.target.value)

  // Login with username and password
  const loginWithUsernameAndPassword = () => {
    login(email, password)
      .then(resp => {
        console.log(resp)
        history.push(location.state?.from ?? '/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Login With google functionality
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(user => {
        const credential = GoogleAuthProvider.credentialFromResult(user)
        if (user) {
          history.push(location.state?.from ?? '/')
          window.localStorage.setItem('auth', 'true')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Signin to Dashboard</h1>
      <label className={`${styles.label} ${styles.m10}`}>Mail ID</label>
      <input type='text' className={styles.inputs} placeholder='SNU Email ID' />

      <label className={`${styles.label} ${styles.m10}`}>Password</label>
      <div className={styles.password}>
        <i onClick={() => setShow(!show)} className={styles.visible}>
          <RemoveRedEyeIcon />
        </i>
        <input
          type={show ? 'text' : 'password'}
          className={styles.inputs}
          placeholder='Enter Password'
        />
      </div>
      <label className={styles.forgot}>
        <Link className={styles.deco} to='/forgotpassword'>
          Forgot password?
        </Link>
      </label>
      <div>
        <button className={styles.signin}>Sign In</button>
      </div>
      <span className={styles.line}></span>

      <button onClick={loginWithGoogle} className={styles.google}>
        <img className={styles.googleImg} src='/images/google.png' alt='' />
        Sign-in with Google
      </button>
      <p>
        Don’t have an account?{' '}
        <Link className={styles.deco} to='/signup'>
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default Login
