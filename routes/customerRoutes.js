const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// POST route to add a new customer
router.post('/add', async (req, res) => {
    try {
        const { firstname, lastname, email, phone, address, dob, zipcode, gender, age } = req.body;

        const newCustomer = new Customer({
            firstname,
            lastname,
            email,
            phone,
            address,
            dob,
            zipcode,
            gender,
            age,
            userId: req.session.user._id  // Ensure the customer is associated with the logged-in user
        });

        await newCustomer.save();
        res.redirect('/customers/data'); // Redirect to customer data page after adding
    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).send('Failed to add customer');
    }
});

// GET route to retrieve customer data and render the view
router.get('/data', async (req, res) => {
    try {
        const customers = await Customer.find({ userId: req.session.user._id });
        res.render('customerData', { customers }); // Render customerData.ejs with customers data
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).send('Failed to fetch customers');
    }
});

// GET route to display edit form
router.get('/edit/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.render('editCustomer', { customer });
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).send('Failed to fetch customer');
    }
});

// POST route to update customer information
router.post('/edit/:id', async (req, res) => {
    try {
        const { firstname, lastname, email, phone, address, dob, zipcode, gender, age } = req.body;
        await Customer.findByIdAndUpdate(req.params.id, {
            firstname,
            lastname,
            email,
            phone,
            address,
            dob,
            zipcode,
            gender,
            age
        });
        res.redirect('/customers/data'); // Redirect to customer data page after updating
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).send('Failed to update customer');
    }
});

// GET route to delete a customer
router.get('/delete/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.redirect('/customers/data'); // Redirect to customer data page after deleting
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).send('Failed to delete customer');
    }
});

module.exports = router;
