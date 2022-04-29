import React, { useState } from 'react'
import { useHistory, Link} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import styles from './Login.module.css'

const Login = () => {
  // General
  const history = useHistory()

  // Firestore initialilzing
  const { login } = useAuth()

  // States
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Email Field
  const changeEmail = e => setEmail(e.target.value)

  // Password Field
  const changePassword = e => setPassword(e.target.value)

  // Login with username and password
  const loginWithUsernameAndPassword = () => {
    if(email === "ca.sc@snu.edu.in" && password === "test123"){
        login(email, password)
        .then(resp => {
            console.log(resp)
            history.push(location.state?.from ?? '/')
        })
        .catch(error => {
            console.log(error)
        })
    } else{
        console.log("Invalid ID or password")
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Signin to Admin Dashboard</h1>
      <label className={`${styles.label} ${styles.m10}`}>Mail ID</label>
      <input type='text' onChange={changeEmail} className={styles.inputs} placeholder='SNU Email ID' />

      <label className={`${styles.label} ${styles.m10}`}>Password</label>
      <div className={styles.password}>
        <i onClick={() => setShow(!show)} className={styles.visible}>
          <RemoveRedEyeIcon />
        </i>
        <input
          type={show ? 'text' : 'password'}
          onChange={changePassword}
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
        <button onClick={loginWithUsernameAndPassword} className={styles.signin}>Sign In</button>
      </div>
      <span className={styles.line}></span>
    </div>
  )
}

export default Login
