const functions = require("firebase-functions");
const admin = require('firebase-admin');
const region = 'asia-south1';
const functions_reg = functions.region(region);
const db = admin.firestore();