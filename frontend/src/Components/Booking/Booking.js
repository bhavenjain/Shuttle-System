import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { OrderDetails } from '../../actions/actions'
import './Booking.css'

function loadScript(src) {
  return new Promise((resolve) => {
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

function Booking() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Check your network connection')
      return
    }

    const data = await fetch('http://localhost:5000/razorpay', {
      method: 'POST',
    }).then((res) => res.json())

    const options = {
      key: __DEV__ ? 'rzp_test_ZsfvZ7WD4P79zf' : 'PRODUCTION_KEY',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Book a Seat',
      description: 'Shiv Nadar University',
      image: '',
      timeout: 60,
      retry: { enabled: true, max_count: 5 },

      handler: function (response) {
        const orderDetails = {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
        }
        navigate('/success')
        dispatch(OrderDetails(orderDetails))
      },
      // callback_url: url,
      // redirect: false,
      prefill: {
        name: '',
        email: '',
        phone_number: '',
      },
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <div style={{ background: 'none' }}>
      <form style={{ background: 'none' }}>
        <input type="button" onClick={displayRazorpay} value="Proceed to Pay" />
      </form>
    </div>
  )
}

export default Booking
