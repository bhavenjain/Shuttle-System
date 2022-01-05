import React, { useState } from 'react'
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

  const [passengers, setPassengers] = useState(1)

  async function displayRazorpay () {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Check your network connection')
      return
    }

    const data = await fetch('http://localhost:5000/razorpay', {
      method: 'POST'
    }).then(t => t.json())

    // console.log(data)

    const options = {
      key: __DEV__ ? 'rzp_test_LrFvvquNKDnRvZ' : 'PRODUCTION_KEY',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Book a Seat',
      description: '',
      image: '',
      handler: function (response) {
        // console.log(response)
      },
      prefill: {
        name: '',
        email: '',
        phone_number: ''
      }
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
