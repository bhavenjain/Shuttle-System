const functions = require("firebase-functions");
const admin = require('firebase-admin');
const region = 'asia-south1';
const functions_reg = functions.region(region);
const db = admin.firestore();


exports.addbooking = functions_reg.https.onRequest(async (req,res) =>{
    const booking = erq.body.booking;
    try{
            
    }catch(e){
        res.status(500).json({"status":0,"msg":"Inetrnal error booking failed"});
    }
});