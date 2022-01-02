const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    passsengerDetails: [
        {
            name:{ type: String, required: true},
            gender: {type: String, required: true}

        },
    ],
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    busId: {
        type: Schema.Types.ObjectId,
        ref: "BUS",
        required: true
    },
    seats: {
        type: [Number],
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    bookingDate: {
        type: String,
        required: true
    },
});
