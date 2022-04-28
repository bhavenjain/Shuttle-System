import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import styles from './Login.module.css'

const Signup = () => {
  // General
  const history = useHistory()

  // States
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState(false)
  const [password, setPassword] = useState(false)
  const [number, setNumber] = useState(false)
  const [name, setName] = useState(false)
  const [rePassword, setRePassword] = useState(false)

  // Email Field
  const changeEmail = e => setEmail(e.target.value)

  // Password Field
  const changePassword = e => setPassword(e.target.value)

  const changeName = e => setName(e.target.value)

  const changeNumber = e => setNumber(e.target.value)

  const changeRePass = e => setRePassword(e.target.value)

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
        <i onClick={() => setShow(!show)} className={styles.visible}>
          <RemoveRedEyeIcon />
        </i>
        <input
          type={show ? 'text' : 'password'}
          className={styles.inputs}
          placeholder='Enter Password'
          onChange={changePassword}
        />
      </div>
      <label className={`${styles.label} ${styles.m5}`}>
        Re-enter Password
      </label>
      <div className={styles.password}>
        <i onClick={() => setShow(!show)} className={styles.visible}>
          <RemoveRedEyeIcon />
        </i>
        <input
          type={show ? 'text' : 'password'}
          className={styles.inputs}
          placeholder='Re-enter Password'
          onChange={changeRePass}
        />
      </div>
      <div>
        <button className={styles.signin}>Sign-up</button>
      </div>
      <span className={styles.line}></span>

      <button className={styles.google}>
        <img className={styles.googleImg} src='/images/google.png' alt='' />
        Sign-in with Google
      </button>
      <p>
        Already have an account?{' '}
        <Link className={styles.deco} to='/login'>
          Sign In now
        </Link>
      </p>
    </div>
  )
}

export default Signup
