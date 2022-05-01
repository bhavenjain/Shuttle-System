import React, { useState, useEffect } from 'react'
import { currentDate, tomorrowDate, dayAfterDate } from '../../util'
import './TabsForm.css'

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
  'Dec',
]

const TabsForm = ({ setDates,setSendD }) => {
  const [today, setToday] = useState(false)
  const [tom, setTom] = useState(false)
  const [next, setNext] = useState(false)

  const handleChange = (event) => {
    const values = event.target.parentNode.id
    console.log(values)
    const aaj = JSON.stringify(currentDate.getDate()).length > 1 ? JSON.stringify(currentDate.getDate()) : `0${JSON.stringify(currentDate.getDate())}`
    const kal = JSON.stringify(tomorrowDate.getDate()).length > 1 ? JSON.stringify(tomorrowDate.getDate()) : `0${JSON.stringify(tomorrowDate.getDate())}`
    const parso = JSON.stringify(dayAfterDate.getDate()).length > 1 ? JSON.stringify(dayAfterDate.getDate()) : `0${JSON.stringify(dayAfterDate.getDate())}`

    
    setSendD(values);
    const value = values.substring(0, 2)
    console.log(value, parso)
    console.log(parso === value)
    if (value === aaj) {
      setToday(true)
      setTom(false)
      setNext(false)
      setDates({
        date: JSON.stringify(currentDate.getDate()),
        day: weekday[currentDate.getDay()],
        month: month[currentDate.getMonth()],
        year: currentDate.getFullYear()
      })
    } else if (value === kal) {
      setToday(false)
      setTom(true)
      setNext(false)
      setDates({
        date: JSON.stringify(tomorrowDate.getDate()),
        day: weekday[tomorrowDate.getDay()],
        month: month[tomorrowDate.getMonth()],
        year: tomorrowDate.getFullYear()
      })
    } else if (value === parso) {
      setToday(false)
      setTom(false)
      setNext(true)
      setDates({
        date: JSON.stringify(dayAfterDate.getDate()),
        day: weekday[dayAfterDate.getDay()],
        month: month[dayAfterDate.getMonth()],
        year: dayAfterDate.getFullYear()
      })
    } else {
      setToday(false)
      setTom(false)
      setNext(false)
    }
  }

  return (
    <div className="tabsForm">
      <label>Choose a Date</label>
      <div className="tabsForm__tabs">
        <div
          className={'tabsForm__panel' + (today ? ' tabsForm__focused' : '')}
          id={`${
            JSON.stringify(currentDate.getDate()).length > 1 ? '' : '0'
          }${currentDate.getDate()}/${
            JSON.stringify(currentDate.getMonth()).length > 1 ? '' : '0'
          }${currentDate.getMonth()}/${currentDate.getFullYear()}`}
          onClick={handleChange}
        >
          <p>{weekday[currentDate.getDay()]}</p>
          <h3>{currentDate.getDate()}</h3>
          <p>{month[currentDate.getMonth()]}</p>
        </div>
        <div
          className={'tabsForm__panel' + (tom ? ' tabsForm__focused' : '')}
          id={`${
            JSON.stringify(tomorrowDate.getDate()).length > 1 ? '' : '0'
          }${tomorrowDate.getDate()}/${
            JSON.stringify(tomorrowDate.getMonth()).length > 1 ? '' : '0'
          }${tomorrowDate.getMonth()}/${tomorrowDate.getFullYear()}`}
          onClick={handleChange}
        >
          <p>{weekday[tomorrowDate.getDay()]}</p>
          <h3>{tomorrowDate.getDate()}</h3>
          <p>{month[tomorrowDate.getMonth()]}</p>
        </div>
        <div
          className={'tabsForm__panel' + (next ? ' tabsForm__focused' : '')}
          id={`${
            JSON.stringify(dayAfterDate.getDate()).length > 1 ? '' : '0'
          }${dayAfterDate.getDate()}/${
            JSON.stringify(dayAfterDate.getMonth()).length > 1 ? '' : '0'
          }${dayAfterDate.getMonth()}/${dayAfterDate.getFullYear()}`}
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
