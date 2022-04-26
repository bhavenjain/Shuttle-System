const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { set } = require("mongoose");
const region = 'asia-south1';
const functions_reg = functions.region(region);
const db = admin.firestore();
db_ref_b = db.collection('buses');

exports.addBus = functions_reg.https.onRequest(async (req,res) =>{
    try{
        const bus = req.body.bus;
        bus["uid"] = db_ref_b.doc().id;
        await db_ref_b.doc().set(bus);
        res.status(200).json({"status":1,"msg":"Bus aded successfully"});

    }catch(e){
        functions.logger.error(e);
        res.status(500).json({"status":0,"msg":"Internal error"});
    }

});

module.exports.getBuses = async (req, res) => {
    try {
      filter = {}
      const bus_response = await Bus.find(filter)
      res.status(200).json({ data: bus_response })
    } catch (err) {
      console.log(err)
      res.status(400).json({ msg: 'internal error while fetching busses' })
    }
  }