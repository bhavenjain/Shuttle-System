const functions = require("firebase-functions");
const admin = require('firebase-admin');
const Razorpay = require('razorpay');
admin.initializeApp();
const region = 'asia-south1';
const functions_reg = functions.region(region);
const db = admin.firestore();
const cors = require('cors')({ origin: true });

const shortid = require('shortid');

exports.check = functions_reg.https.onRequest((req, res) => {
  res.status(200).json({ "status": "working" });
})

exports.bus = require('./bus/bus');
exports.booking = require('./booking/booking');
exports.location = require('./locations/locations');
exports.user = require('./user/users');


const razorpay = new Razorpay({
  key_id: 'rzp_test_iERGi2QxdZoml1',
  key_secret: 'FdSie3kygm5uE39fwsZWqBNW'
})

exports.verification = functions_reg.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const secret = '123456789'

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
        JSON.stringify(req.body, null, 4)
      )
    } else {
      // pass it
      console.log(req.body.payload.payment.entity.status)
    }
    res.status(200).json({ status: 'ok' })
  });
});


exports.razorpay = functions_reg.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const ticketAmount = req.body.amount;
    if(!ticketAmount) {
      res.status(400).json({message: "No amount added"})
      return;
    }
    const payment_capture = 1
    const amount = parseInt(ticketAmount)
    const currency = 'INR'

    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture
    }

    try {
      const response = await razorpay.orders.create(options)
      // console.log(response)
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
      })
    } catch (error) {
      console.log(error)
    }

  })
});
