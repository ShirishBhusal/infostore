const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const User = require('../models/user');

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/');
}

// Route to render the login page
router.get('/', (req, res) => {
    res.render('login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Route to get all customers for the logged-in user
router.get('/index', isAuthenticated, async (req, res) => {
    try {
        const customers = await Customer.find({ userId: req.session.user._id });
        res.render('index', { customers });
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.redirect('/');
    });
});

module.exports = router;
