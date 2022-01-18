const Bus = require('../models/BusInfo')
const Booking = require('../models/bookings')

module.exports.addBooking = async (req, res) => {
  console.log(req.body)
  const booking = req.body.booking
  //   try {
  //     if (booking == undefined) {
  //       res.status(400).send({ result: false, msg: 'Required booking body' })
  //     } else {
  //       const data = Booking.create(booking)
  //       res.status(201).json({ data: data })
  //     }
  //   } catch (e) {
  //     console.log(e)
  //     res
  //       .status(400)
  //       .send({ result: false, msg: 'Internal error while saving booking' })
  //   }
}

// module.exports.updateBooking = async (req, res) => {
//     const booking = req.body.booking;
//     try{
//         if(booking == undefined){
//             res.status(400).send({"result": false, "msg":"Required booking body"});
//         }else{
//             const data = Booking.update(booking);
//         }
//         res.status(201).json({ data: data })
//     }catch(e){
//         console.log(e);
//         res.status(400).send({"result": false, "msg":"Internal error while saving booking"});
//     }
// }

module.exports.deleteBooking = async (req, res) => {
  const id = req.query.bookingid
  try {
    if (booking == undefined) {
      res.status(400).send({ result: false, msg: 'Required booking body' })
    } else {
      const data = Booking.deleteOne({ _id: id })
      res.status(201).json({ data: true, msg: 'success' })
    }
  } catch (e) {
    console.log(e)
    res
      .status(400)
      .send({ result: false, msg: 'Internal error while deleting booking' })
  }
}
