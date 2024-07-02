const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true },
    zipcode: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
