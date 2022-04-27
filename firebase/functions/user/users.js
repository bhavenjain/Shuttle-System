const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { set } = require("mongoose");
const region = 'asia-south1';
const functions_reg = functions.region(region);
const db = admin.firestore();


exports.fetch = functions_reg.https.onRequest(async (req, res)=>{
    
})