import React, { useState, useEffect } from 'react'
import { objectToListLocations, parseBuses } from '../../util'
import { getBusesApi, getLocationsApi, createUserApi, loginUserApi } from '../../http'
// import { useAuth } from '../../context/AuthContext'; 
import { useAuth } from '../../context/AuthContext'
import TabsForm from '../TabsForm/TabsForm'
import BusLogs from '../BusLogs/BusLogs'
import { getAuth } from "firebase/auth"
// import {useAuth} from "../../context/AuthContext"

import Button from '../Button/Button'
import Field from '../Field/Field'
import NoBus from './NoBus/NoBus'
import Note from '../Note/Note'
import '../../App.css'

const LandingPage = () => {
  // const { currentUser } = useAuth();
  // User selected location
  const [location, setLocation] = useState({
    from: '',
    to: ''
  })

  const { currentUser } = useAuth()

  // Locations
  const [options, setOptions] = useState([])

  // User selected date
  const [dates, setDates] = useState({
    date: '',
    day: '',
    month: '',
    year: ''
  })

  // const [data, setData] = useState(null) // Bus data
  const [no, setNo] = useState(false) // To display if bus is not availbale
  const [buses, setBuses] = useState(null) // Set available buses
  const [toggleButton, setToggleButton] = useState(false) // Button Toggle
  const [sendDate, setSendDate] = useState('') // Date state
  const [sendD, setSendD] = useState('') // Date state

  // Fetch the data for locations
  const getLocations = async () => {
    try {

      const data = await getLocationsApi();
      const locationsList = data.locations
      setOptions(...options, locationsList);
      // objectToListLocations(locationsList, setOptions)
    } catch (error) {
      console.log('Error')
    }
  }

  // Get Buses Data
  const getData = async () => {
    try {
      console.log("sendD:", sendD);
      let query = `?date=${sendD}&to=${location.to}&from=${location.from}`
      console.log(query);
      const data = await getBusesApi(query);
      // setData(data.data)
      setBuses(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // const setUser = async () => {
  //   console.log(currentUser)
  //   await currentUser.reload()
  //   const user = getAuth().currentUser;
  //   let phone;
  //   if (user.phoneNumber) {
  //     phone = user.phoneNumber
  //   } else if (user.photoURL) {
  //     phone = user.photoURL
  //   }

  //   console.log(user.displayName)

  //   let userObj = JSON.stringify({
  //     user: {
  //       name: user.displayName,
  //       email: user.email,
  //       contact: phone,
  //       uid: user.uid,
  //       signupTimestamp: user.metadata.createdAt,
  //       last_login: user.metadata.lastLoginAt
  //     }
  //   });
  //   console.log(userObj);
  //   await loginUserApi(userObj);
  // }

  // Initial call to api
  useEffect(() => {
    console.log("sendD", sendD)
  }, [sendD])
  useEffect(() => {
    // setUser()
    getLocations()
    // getData()
  }, [])

  //   useEffect(() => {
  //   if (currentUser) {
  //     console.log(currentUser?.emailVerified)
  //   }
  //   // if(currentUser.emailVerified === true) {
  //   //   notifyEmail()
  //   // }
  // }, [currentUser])


  // // Parse the loaded data
  // useEffect(() => {
  //   parseBuses(buses, setBuses)
  //   console.log(buses)
  // }, [toggleButton, location])

  return (
    <div className='app'>
      <h1 className='app__heading'>Shuttle Status</h1>
      <form>
        <Field
          options={options}
          location={location}
          setLocation={setLocation}
        />
        <TabsForm setDates={setDates} setSendD={setSendD} />
        <Button
          toggleButton={toggleButton}
          setToggleButton={setToggleButton}
          setNo={setNo}
          getData={getData}
        />
      </form>
      {buses ? (
        <BusLogs buses={buses} dates={dates} sendDate={sendDate} />
      ) : no ? (
        <NoBus />
      ) : (
        console.log('')
      )}
      <Note />
    </div>
  )
}

export default LandingPage
