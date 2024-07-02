const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Add a new customer
router.post('/add', async (req, res) => {
    try {
        const newCustomer = new Customer({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            dob: req.body.dob,
            zipcode: req.body.zipcode,
            gender: req.body.gender,
            age: req.body.age,
            userId: req.session.user._id
        });
        await newCustomer.save();
        res.redirect('/customers/data');
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).send("Error adding customer");
    }
});

// View all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.render('customers', { customers });
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).send("Error fetching customers");
    }
});

// Edit customer
router.post('/edit/:id', async (req, res) => {
    try {
        await Customer.findByIdAndUpdate(req.params.id, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            dob: req.body.dob,
            zipcode: req.body.zipcode,
            gender: req.body.gender,
            age: req.body.age,
            userId: req.session.user._id // Assuming userId might change as well, otherwise this line can be removed
        });
        res.redirect('/customers');
    } catch (error) {
        console.error("Error editing customer:", error);
        res.status(500).send("Error editing customer");
    }
});

// Delete customer
router.post('/delete/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.redirect('/customers');
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).send("Error deleting customer");
    }
});

module.exports = router;
