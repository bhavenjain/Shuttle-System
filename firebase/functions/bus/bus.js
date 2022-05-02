const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { bus } = require("..");
const { copyIfPresent } = require("firebase-functions/lib/common/encoding");
// const { set } = require("mongoose");
const region = 'asia-south1';
const functions_reg = functions.region(region);
const db = admin.firestore();
db_ref_b = db.collection('buses');
const cors = require('cors')({origin: true});

exports.addBus = functions_reg.https.onRequest(async (req,res) =>{
  cors(req, res, async () => {
    console.log(req.body);
    try{
        const bus = req.body.bus;
        const doc_ref = db_ref_b.doc();
        console.log(bus);
        if((bus && (!bus.to || !bus.from || !bus.date || !bus.time || !bus.busNo || !bus.total || !bus.price)) || !bus){
          res.status(400).json({"status":0,"msg":"Bad Request all fields are compulsory"});
          return;    
        }
        let dates = bus.date.split("/");
        let n_date = `${dates[2]}-${dates[1]}-${dates[0]}`;
        let time_in_milli = new Date(`${n_date}T${bus.time}:00+0530`)
        bus["uid"] = doc_ref.id;
        bus["time_in_milli"] = time_in_milli.getTime(); 
        bus["price"] = parseInt(bus["price"]);
        bus["total"] = parseInt(bus["total"]);
        bus["remaining"] = parseInt(bus["remaining"]);
        await db_ref_b.doc(doc_ref.id).set(bus);
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
  const to = req.query.to;
  const from = req.query.from;
  console.log(to,from,date);
  if(!date||!to||!from){
    res.status(400).json({"status":0,"msg":"Bad request require query param: date, to, from"});
    return;
  }
  console.log(date);
  let dates = date.split("/");
  let n_date = `${dates[2]}-${dates[1]}-${dates[0]}`;
  let curr_time = Date.now();
  let end_time = new Date(`${n_date}T23:59:59+0530`);
  let selected_date = new Date(`${n_date}T00:00:00+0530`);
  let start_time = selected_date>curr_time?selected_date.getTime():curr_time;
  console.log(n_date)
  try {
      const query_result = await db_ref_b
      .where("from","==",from).where("to","==",to)
      .where("time_in_milli",">=",start_time)
      .where("time_in_milli","<=",end_time.getTime())
      .orderBy("time_in_milli","asc").get();
      let buses =[];
      if(query_result.size == 0){
        res.status(200).json({"status":0,"msg":"no buses found"});
        return;
      }
      query_result.forEach(doc => {
        if(doc.data().remaining>0){

          buses.push(doc.data());    
        }
      });
      res.status(200).json({"status":1 ,"data": buses });
    } catch (err) { 
      console.log(err)
      res.status(400).json({ msg: 'internal error while fetching busses' })
    }
  });
  });

  exports.deleteBus = functions_reg.https.onRequest(async (req,res) =>{
    cors(req, res, async() =>{
      const uid = req.query.uid;
      try{
        await db_ref_b.doc(uid).delete();
      }catch(e){
        console.log(e);
        res.status(500).json({"status":0,"msg":"Internal error"});
      }
    })
  })

  exports.updateBus = functions_reg.https.onRequest(async (req,res) =>{
    cors(req, res, async() =>{
      try{
        const bus = req.body.bus;
        // const doc_ref = db_ref_b.doc();
        // console.log(bus);
        // if((bus && (!bus.to || !bus.from || !bus.date || !bus.time || !bus.busNo || !bus.total || !bus.price)) || !bus){
        //   res.status(400).json({"status":0,"msg":"Bad Request all fields are compulsory"});
        //   return;    
        // }
        let dates = bus.date.split("/");
        let n_date = `${dates[2]}-${dates[1]}-${dates[0]}`;
        let time_in_milli = new Date(`${n_date}T${bus.time}:00+0530`)
        // bus["uid"] = doc_ref.id;
        bus["time_in_milli"] = time_in_milli.getTime(); 
        bus["price"] = parseInt(bus["price"]);
        bus["total"] = parseInt(bus["total"]);
        bus["remaining"] = parseInt(bus["remaining"]);
        await db_ref_b.doc(bus.uid).update(bus);
        res.status(200).json({"status":1,"msg":"Bus updated successfully"});

    }catch(e){
        functions.logger.error(e);
        res.status(500).json({"status":0,"msg":"Internal error"});
    }
    })
  })