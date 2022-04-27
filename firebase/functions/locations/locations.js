const functions = require('firebase-functions')
const admin = require('firebase-admin')
const region = 'asia-south1'
const functions_reg = functions.region(region)
const db = admin.firestore()
db_ref_l = db.collection('locations')

exports.updateLocation = functions_reg.https.onRequest(async (req, res) => {
  const add = req.body.add
  const del = req.body.delete
  try {
    if (add) {
      await db_ref_l.doc(add).set();
      res.status(201).json({ status: 1, msg: 'Location added successfully' })
    }
    if (del) {
      await db_ref_l.doc(location).delete()
      res.status(200).json({ status: 1, msg: 'Location deleted' })
    }
  } catch (error) {
      functions.logger.error(error)
      res.status(500).json({status: 0, msg: "Internal Error"})
  }
})
