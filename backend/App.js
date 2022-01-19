const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const busRoutes = require('./routers/bus')
const locations = require('./routers/location')
const bookings = require('./routers/booking')
// const Routes = require('./routers/routes')
const Razorpay = require('razorpay')
const shortid = require('shortid')
const crypto = require('crypto')
const bodyParser = require('body-parser')

dotenv.config({ path: './config.env' })
require('./db/connection')

// Cors Options
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000'],
}

// require('./middleware/data')
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(busRoutes)
app.use(locations)
app.use(bookings)
// app.use(Routes)

const razorpay = new Razorpay({
  key_id: 'rzp_test_ZsfvZ7WD4P79zf',
  key_secret: 'uO8vw4druul1HosjKFcY26Ir',
})

app.post('/verification', (req, res) => {
  // do a validation
  // res.redirect('http://localhost:3000/success')
  const secret = '12345678'

  const shasum = crypto.createHmac('sha256', secret)
  shasum.update(JSON.stringify(req.body))
  const digest = shasum.digest('hex')

  //   console.log(digest, req.headers['x-razorpay-signature'])

  if (digest === req.headers['x-razorpay-signature']) {
    console.log('Mail: ' + req.body.payload.payment.entity.email)
    console.log('Mobile: ' + req.body.payload.payment.entity.contact)
    console.log('Status: ' + req.body.payload.payment.entity.status)
    console.log('Captured: ' + typeof req.body.payload.payment.entity.captured)
    console.log('Method: ' + req.body.payload.payment.entity.method)
    console.log()
    console.log('request is legit')
    // process it
    // if(typeofreq.body.payload.payment.entity.captured){

    // }

    require('fs').writeFileSync(
      'payment1.json',
      JSON.stringify(req.body, null, 4),
    )
  } else {
    // pass it
    console.log(req.body.payload.payment.entity.status)
  }
  res.status(200).json({ status: 'ok' })
})

app.post('/success', async (req, res) => {
  res.redirect('http://localhost:3000/success')
})

app.post('/notfound', async (req, res) => {
  // console.log(req)
  res.redirect('http://localhost:3000/notfound')
})

app.post('/razorpay', async (req, res) => {
  const payment_capture = 1
  const amount = 100
  const currency = 'INR'

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  }

  try {
    const response = await razorpay.orders.create(options)
    // console.log(response)
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    })
  } catch (error) {
    console.log(error)
  }
})

app.listen(5000, () => {
  console.log('server started')
})
