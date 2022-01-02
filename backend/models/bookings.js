const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    passsengerDetails: [
        {
            name:{ type: String, required: true},
            gender: {type: String, required: true}

        },
    ],

});
