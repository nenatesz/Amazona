const mongoose = require("mongoose");



const paymentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    totalPrice: {type: Number, required: true},
    refernce: {type: String, required: true},
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;