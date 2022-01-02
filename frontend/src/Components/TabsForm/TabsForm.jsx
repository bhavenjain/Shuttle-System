import React, { useState } from 'react'
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
// import Box from '@mui/material/Box'
import { currentDate, tomorrowDate, dayAfterDate } from '../../util'
import './TabsForm.css'
// import { Tabs, Tab, Typography, Box } from '@material-ui/core'

const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const TabsForm = ({ dates, setDates }) => {
  const [today, setToday] = useState(false)
  const [tom, setTom] = useState(false)
  const [next, setNext] = useState(false)

  const handleChange = event => {
    const value = event.target.parentNode.id
    if (value == currentDate.getDate()) {
      setToday(true)
      setTom(false)
      setNext(false)
      setDates({
        date: JSON.stringify(currentDate.getDate()),
        day: weekday[currentDate.getDay()],
        month: month[currentDate.getMonth()]
      })
    } else if (value == tomorrowDate.getDate()) {
      setToday(false)
      setTom(true)
      setNext(false)
      setDates({
        date: JSON.stringify(tomorrowDate.getDate()),
        day: weekday[tomorrowDate.getDay()],
        month: month[tomorrowDate.getMonth()]
      })
    } else if (value == dayAfterDate.getDate()) {
      setToday(false)
      setTom(false)
      setNext(true)
      setDates({
        date: JSON.stringify(dayAfterDate.getDate()),
        day: weekday[dayAfterDate.getDay()],
        month: month[dayAfterDate.getMonth()]
      })
    } else {
      setToday(false)
      setTom(false)
      setNext(false)
    }
  }

  return (
    <div className='tabsForm'>
      <label>Choose Date</label>
      <div className='tabsForm__tabs'>
        <div
          className={'tabsForm__panel' + (today ? ' tabsForm__focused' : '')}
          id={currentDate.getDate()}
          onClick={handleChange}
        >
          <p>{weekday[currentDate.getDay()]}</p>
          <h3>{currentDate.getDate()}</h3>
          <p>{month[currentDate.getMonth()]}</p>
        </div>
        <div
          className={'tabsForm__panel' + (tom ? ' tabsForm__focused' : '')}
          id={tomorrowDate.getDate()}
          onClick={handleChange}
        >
          <p>{weekday[tomorrowDate.getDay()]}</p>
          <h3>{tomorrowDate.getDate()}</h3>
          <p>{month[tomorrowDate.getMonth()]}</p>
        </div>
        <div
          className={'tabsForm__panel' + (next ? ' tabsForm__focused' : '')}
          id={dayAfterDate.getDate()}
          onClick={handleChange}
        >
          <p>{weekday[dayAfterDate.getDay()]}</p>
          <h3>{dayAfterDate.getDate()}</h3>
          <p>{month[dayAfterDate.getMonth()]}</p>
        </div>
      </div>
    </div>
  )
}

export default TabsForm
