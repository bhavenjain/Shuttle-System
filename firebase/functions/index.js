const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const region = 'asia-south1';
const functions_reg = functions.region(region);
const db = admin.firestore();

exports.check = functions_reg.https.onRequest((req, res) =>{
    res.status(200).json({"status":"working"});
})

exports.bus = require('./bus/bus');