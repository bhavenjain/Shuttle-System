const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { firestore } = require("firebase-admin");
const region = 'asia-south1';
const functions_reg = functions.region(region);
const db = admin.firestore();
const cors = require('cors')({ origin: true });
const db_ref_book = db.collection("bookings");
const db_ref_bus = db.collection("buses");

exports.create = functions_reg.https.onRequest(async (req,res) =>{
    cors(req, res, async () => {
    const booking = req.body.bookObj;
    const bus = booking.bus;
    const user = booking.user;
    const doc_ref = db_ref_book.doc();
    try{
        const saveObj = {}
        saveObj["bus"] = {
            "from":bus.from,
            "to":bus.to,
            "time":bus.time,
            "price":bus.price,
            "uid":bus.uid,
            "busNo":bus.busNo
        }
        saveObj["user"] ={
            "name":user.displayName,
            "email":user.email,
            "uid":user.uid
        }
        saveObj["uid"] = db_ref_book.doc(doc_ref.id);
        console.log(saveObj);
        await db.runTransaction(async (t) =>{
            t.set(db_ref_book.doc(doc_ref.id), saveObj);
            t.update(db_ref_bus.doc(bus.uid),{"remaining":firestore.FieldValue.increment(-1)});
        })
        console.log(booking)
        res.status(200).json({"status":1,"uid":saveObj["uid"],"msg":"success"});
                    //orderid, name, contact, emailid,uid,bus{to, from ,time, price,date}
    }catch(e){
        console.log(e);
        res.status(500).json({"status":0,"msg":"Inetrnal error booking failed"});
    }
});
});