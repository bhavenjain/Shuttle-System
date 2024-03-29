import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
  const baseUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch()
  const history = useHistory()
  const Bus = useSelector(state => state.BusBooked)

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Check your network connection')
      return
    }

    const data = await fetch(`${baseUrl}/razorpay`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
       body: JSON.stringify({
            "amount": Bus.price
       })
    }).then((res) => res.json()).catch((e) => console.log(e))

    const options = {
      key: __DEV__ ? 'rzp_test_iERGi2QxdZoml1' : 'PRODUCTION_KEY',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Book a Seat',
      description: 'SBS-SNU',
      image: '',
      timeout: 60,
      retry: { enabled: true, max_count: 5 },
      external:{"wallets":['paytm']},

      handler: function (response) {
        const orderDetails = {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
        }
        history.push('/success')
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
    try{
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    }catch(e){
      // dbugPrint('error:e')
      console.log(e);
    }
  }

  return (
    <div style={{ background: 'none' }}>
      <form style={{ background: 'none' }}>
        <input type="button" 
        onClick={displayRazorpay} 
        value="Proceed to Pay" />
      </form>
    </div>
  )
}

export default Booking
