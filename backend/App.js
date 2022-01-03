const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const busRoutes = require('./routers/bus')
// const Routes = require('./routers/routes')
const Razorpay = require('razorpay')
const shortid = require('shortid')

dotenv.config({ path: './config.env' })
require('./db/connection')

// require('./middleware/data')

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(busRoutes)
// app.use(Routes)

const razorpay = new Razorpay({
	key_id: 'rzp_test_OW3zsLjOx9ojcu',
	key_secret: 'XoQKkS0cUhCZMlw16WMmQXI0'
})

app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = 499
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})


app.listen(5000, () => {
  console.log('server started')
})

