import React, { useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import styles from './Signup.module.css'
import { 
  GoogleAuthProvider,
  getAuth,
  signInWithPopup, 
  updateProfile, 
  sendEmailVerification } from 'firebase/auth'
import { useAuth } from '../../context/AuthContext'
 
const Signup = () => {
  // General
  const history = useHistory()
  const {register} = useAuth()
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const location = useLocation()
  // States
  const [showPass, setShowPass] = useState(false)
  const [showRePass, setShowRePass] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [number, setNumber] = useState("")
  const [name, setName] = useState("")
  const [rePassword, setRePassword] = useState("")

  // Email Field
  const changeEmail = e => setEmail(e.target.value)
  // Password Field
  const changePassword = e => setPassword(e.target.value)

  const changeName = e => setName(e.target.value)

  const changeNumber = e => setNumber(e.target.value)

  const changeRePass = e => setRePassword(e.target.value)

  const signUp = async () => {
    if (password === rePassword) {
      register(email, password)
        .then(resp => {
          console.log(resp)
          const user = auth.currentUser
          updateProfile(user, {
            displayName: name,
            phoneNumber: number,
          }).then(() => {
            sendEmailVerification(user).then(() => {
              console.log('Verification email sent')
            })
          })
          history.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      alert('Passwords do not match')
    }
  }
// Login With google functionality
const loginWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(user => {
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
      <h1 className={styles.heading}>Signup</h1>
      <label className={`${styles.label} ${styles.m5}`}>Name</label>
      <input
        type='text'
        onChange={changeName}
        className={styles.inputs}
        placeholder='Name'
      />
      <label className={`${styles.label} ${styles.m5}`}>Mail ID</label>
      <input
        type='text'
        onChange={changeEmail}
        className={styles.inputs}
        placeholder='SNU Email ID'
      />
      <label className={`${styles.label} ${styles.m5}`}>Mobile Number</label>
      <input
        type='text'
        onChange={changeNumber}
        className={styles.inputs}
        placeholder='Mobile'
      />

      <label className={`${styles.label} ${styles.m5}`}>Password</label>
      <div className={styles.password}>
        <i onClick={() => setShowPass(!showPass)} className={styles.visible}>
          <RemoveRedEyeIcon />
        </i>
        <input
          type={showPass ? 'text' : 'password'}
          className={styles.inputs}
          placeholder='Enter Password'
          onChange={changePassword}
        />
      </div>
      <label className={`${styles.label} ${styles.m5}`}>
        Re-enter Password
      </label>
      <div className={styles.password}>
        <i onClick={() => setShowRePass(!showRePass)} className={styles.visible}>
          <RemoveRedEyeIcon />
        </i>
        <input
          type={showRePass ? 'text' : 'password'}
          className={styles.inputs}
          placeholder='Re-enter Password'
          onChange={changeRePass}
        />
      </div>
      <div>
        <button onClick={signUp} className={styles.signin}>Sign-up</button>
      </div>
      <span className={styles.line}></span>

      <button onClick={loginWithGoogle} className={styles.google}>
        <img className={styles.googleImg} src='/images/google.png' alt='' />
        Sign-in with Google
      </button>
      <p className={styles.p}>
        Already have an account?{' '}
        <Link className={styles.deco} to='/login'>
          Sign In now
        </Link>
      </p>
    </div>
  )
}

export default Signup
