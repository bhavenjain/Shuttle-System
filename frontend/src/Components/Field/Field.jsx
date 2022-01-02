import React, { useState, useEffect, useRef } from 'react'
import SwapVerticalCircleOutlinedIcon from '@material-ui/icons/SwapVerticalCircleOutlined'
import { FormControl, Select, InputLabel } from '@material-ui/core'
import './Field.css'

const Field  = ({ options, location, setLocation }) => {
  const fromRef = useRef(null)
  const toRef = useRef(null)

  useEffect(() => {
    // console.log(location.from)
    // console.log(location.to)
  }, [location])

  const handleChangeFrom = event => {
    const value = event.target.value
    setLocation({
      ...location,
      from: value
    })
  }

  const handleChangeTo = event => {
    const value = event.target.value
    setLocation({
      ...location,
      to: value
    })
  }

  function onClickValueChange () {
    const temp = location.from
    location.from = location.to
    location.to = temp
    // console.log(toRef)
  }

  return (
    <div className='field'>
      <div className='app__form'>
        <FormControl className='field__form'>
          <InputLabel id='demo-simple-select-label'>From</InputLabel>
          <Select
            native
            className='field__select'
            renderValue={value => {
              return { value }
            }}
            value={location.from}
            ref={fromRef}
            label='From'
            onChange={handleChangeFrom}
            defaultValue={options[0]}
          >
            <option value=''>From</option>

            {options.map((option, key) => (
              <option key={key} id={key} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl className='field__form'>
          <InputLabel id='demo-simple-select-label'>To</InputLabel>
          <Select
            native
            className='field__select'
            renderValue={value => {
              return <div>{value}</div>
            }}
            ref={toRef}
            value={location.to}
            label='From'
            onChange={handleChangeTo}
          >
            <option value=''>To</option>

            {options.map((option, key) => (
              <option key={key} id={key} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
        {/* <div className='app__verticalButton' onClick={onClickValueChange}>
          <SwapVerticalCircleOutlinedIcon fontSize='large' />
        </div> */}
      </div>
    </div>
  )
}

export default Field;