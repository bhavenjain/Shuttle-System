const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { set } = require("mongoose");
const region = 'asia-south1';
const cors = require('cors')({ origin: true });
const functions_reg = functions.region(region);
const db = admin.firestore();
db_ref_b = db.collection('buses');

exports.addBus = functions_reg.https.onRequest(async (req,res) =>{
  cors(req, res, async () => {

    try{
        const bus = req.body.bus;
        let dates = bus.date.split("/");
        let n_date = `${dates[2]}-${dates[1]}-${dates[0]}`;
        let time_in_milli = new Date(`${n_date}T${bus.time}:00+0530`)
        bus["uid"] = db_ref_b.doc().id;
        bus["time_in_milli"] = time_in_milli.getTime(); 
        await db_ref_b.doc().set(bus);
        res.status(200).json({"status":1,"msg":"Bus added successfully"});

    }catch(e){
        functions.logger.error(e);
        res.status(500).json({"status":0,"msg":"Internal error"});
    }
  });
});

exports.getBuses = functions_reg.https.onRequest( async (req, res) => {
  cors(req, res, async () => {

  const date = req.query.date;
  let dates = date.split("/");
  let n_date = `${dates[2]}-${dates[1]}-${dates[0]}`;
  let curr_time = Date.now();
  let end_time = new Date(`${n_date}T23:59:59+0530`);
  let selected_date = new Date(`${n_date}T00:00:00+0530`);
  let start_time = selected_date>curr_time?selected_date.getTime():curr_time;
  console.log(n_date)
  try {
      const query_result = await db_ref_b.where("time_in_milli",">=",start_time).where("time_in_milli","<=",end_time.getTime()).orderBy("time_in_milli","asc").get();
      let buses =[];
      if(query_result.size == 0){
        res.status(200).json({"status":1,"msg":"no buses found"});
        return;
      }
      query_result.forEach(doc => {
        buses.push(doc.data());    
      });
      res.status(200).json({"status":1 ,"data": buses });
    } catch (err) {
      console.log(err)
      res.status(400).json({ msg: 'internal error while fetching busses' })
    }
  });
  });