import React, { useEffect } from 'react'

const Payments = () => {
  const useScript = () => {
    useEffect(() => {
      const Script = document.createElement('script')
      //id should be same as given to form element
      const Form = document.getElementById('donateForm')
      Script.setAttribute(
        'src',
        'https://checkout.razorpay.com/v1/payment-button.js'
      )
      Script.setAttribute('data-payment_button_id', 'pl_Ifjm56jwQR2ezo')
      Form.appendChild(Script)
    }, [])
  }

  return (
    <div>
      <form id='donateForm'>{useScript()}</form>
    </div>
  )
}

export default Payments
