import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../Input/Input'
import './Booking.css'

function loadScript (src) {
  return new Promise(resolve => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const __DEV__ = document.domain === 'localhost'

function Booking () {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    number: ''
  })

  const navigate = useNavigate()
  const [passengers, setPassengers] = useState(1)

  async function displayRazorpay () {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Check your network connection')
      return
    }

    const data = await fetch('http://localhost:5000/razorpay', {
      method: 'POST'
    }).then(res => res.json())

    const options = {
      key: __DEV__ ? 'rzp_test_ZsfvZ7WD4P79zf' : 'PRODUCTION_KEY',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Book a seat',
      description: 'Shiv Nadar University',
      image: '',
      prefill: {
        name: '',
        email: '',
        phone_number: ''
      },
      retry: {
        enabled: false,
        max_count: 2,
      },
      notes: {
        NAAM: 'Sins',
      },
      timeout: 300,
      theme: {
        hide_topbar: true,
        color: '#005197',
        backdrop_color: '#000000',
      },
      handler: function (response) {
        // console.log(response)
      },
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <div className=''>
      {/* div for background */}

      {/* Heading */}

      {/* Form */}

      {/* count */}

      {/* submit button */}

      <div className=''>
        <form>
          <div className=''>
            {/* <Input field='Name' />
            <Input field='Enter SNU Email' />
            <Input field='Number' /> */}
            <input
              type='button'
              onClick={displayRazorpay}
              value='Proceed to Pay'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Booking
