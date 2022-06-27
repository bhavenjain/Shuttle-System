import React, { useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import styles from './Login.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminLogin = ({ setAuth }) => {
  // General
  const location = useLocation()
  const history = useHistory()

  // Firestore initialilzing
  const { login } = useAuth()

  const notify = err =>
    toast.error(`${err}`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })

  // States
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Email Field
  const changeEmail = e => setEmail(e.target.value)

  // Password Field
  const changePassword = e => setPassword(e.target.value)

  // Login with username and password
  const loginWithUsernameAndPassword = () => {
    if (
      email === process.env.REACT_APP_ADMIN_ID &&
      password === process.env.REACT_APP_ADMIN_KEY
    ) {
      setAuth(true)
      // login(email, password)
      // .then(resp => {
      //     console.log(resp)
      //     window.location.href = "/admin/acess/bus"
      //     history.push(location.state?.from ?? '/')
      // })
      // .catch(error => {
      //     console.log(error)
      // })
    } else if (email != process.env.REACT_APP_ADMIN_ID) {
      notify('Admin dashboard access is limited to Administrators only')
    } else {
      notify('Invalid Password')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerWeb}>
        <h1 className={styles.heading}>Signin to Admin Dashboard</h1>
        <label className={`${styles.label} ${styles.m10}`}>Mail ID</label>
        <input
          type='text'
          onChange={changeEmail}
          className={styles.inputs}
          placeholder='SNU Email ID'
        />
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
          <button
            onClick={loginWithUsernameAndPassword}
            className={styles.signin}
          >
            Sign In
          </button>
        </div>
        <span className={styles.line}></span>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  )
}

export default AdminLogin
