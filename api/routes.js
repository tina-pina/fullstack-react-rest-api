'use strict';

var express = require("express");
var router = express.Router();

var bcryptjs = require('bcryptjs');

// Models
var User = require("./models").User;
var Course = require("./models").Course;

//check if valid user input like email
const { check, validationResult } = require('express-validator/check');

//basic auth Authorization header
const auth = require('basic-auth');

// Authentication 
const authenticateUser = (req, res, next) => {
    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);
    let message = null;

    // If the user's credentials are available...
    if (credentials) {
        User.findOne({ emailAddress: credentials.name }, function (err, user) {

            // User in DB: If a user was successfully retrieved from the data store...
            if (user) {
                const authenticated = bcryptjs.compareSync(credentials.pass, user.password);

                // Password matches
                if (authenticated) {
                    req.currentUser = user;
                    next();
                }
                // Password DOES NOT match
                else {
                    message = `Authentication failure for username: ${user.emailAddress}`;
                    res.status(401).json({ message: 'Access Denied' });
                }
                // User NOT in DB:
            } else {
                message = `User not found for username: ${credentials.name}`;
                console.warn(message);

                // Return a response with a 401 Unauthorized HTTP status code.
                res.status(401).json({ message: 'Access Denied' });
            }
        })
    }
    // No credential 
    else {
        const error = new Error();
        error.status = 401
        next(error)
    }
}

// Get users
router.get('/users', [authenticateUser], (req, res) => {
    // get and return the current user...
    res.json(req.currentUser);
});

// Create new user
router.post("/users", [
    check('firstName')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "first name"'),
    check('lastName')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "last name"'),
    check('emailAddress')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "username"'),
    check('password')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "password"'),
], function (req, res) {

    // validate firstName, lastName, emailAddress or password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Use the Array `map()` method to get a list of error messages.
        const errorMessages = errors.array().map(error => error.msg);
        // Return the validation errors to the client.
        return res.status(400).json({ errors: errorMessages });
    }

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: bcryptjs.hashSync(req.body.password),
    });
    user.save().then(result => {
        console.log(result);
        res.location('/api');
        res.status(201).json('User Created!');
    })
        .catch(err => {
            console.log(err);
            res.status(400).json({ error: err });
        });
});


// Returns a list of courses
router.get("/courses", function (req, res, next) {
    Course.find({})
        //execute query and call callback function
        .exec(function (err, courses) {
            if (err) return next(err);
            // send back to client
            res.json(courses)
        })
})

// Returns a the course (including the user that owns the course) for the provided course ID
router.param("ID", function (req, res, next, id) {
    Course.findById(id, function (err, doc) {
        if (err) next(err);
        if (!doc) {
            err = new Error("Not Found");
            err.status = 404;
            next(err);
        }
        req.course = doc;
        next();
    })
})

// Get courses
router.get('/courses', (req, res, next) => {
    Course.find({}, { title: true, description: true, user: true })
        .exec(function (err, courses) {
            if (err) return next(err);
            res.json(courses)
        });
});

// Returns a course (including the user that owns the course) for the provided course ID
router.get("/courses/:ID", function (req, res, next) {
    //send document to client
    res.json(req.course);
})

// Creates a course, sets the Location header to the URI for the course, and returns no content
router.post("/courses", [
    authenticateUser,
    check('title')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "title"'),
    check('description')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "description"')
], function (req, res, next) {
    // validate title or description

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Use the Array `map()` method to get a list of error messages.
        const errorMessages = errors.array().map(error => error.msg);

        // Return the validation errors to the client.
        return res.status(400).json({ errors: errorMessages });
    }

    // Create course
    const course = new Course({
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded,
    });

    // Save Course in DB
    course.save(function (err, course) {
        if (err) return next(err);
        // document was successfully saved 
        else {
            res.location('/' + course.id)
            res.sendStatus(201)
        };
    })
})

// Updates a course and returns no content
router.put("/courses/:ID", [authenticateUser], function (req, res, next) {
    req.course.update(req.body, function (err, result) {
        if (err) return next(err);
        //send results in question document back to client
        res.sendStatus(204);
    });
})

// Deletes a course and returns no content
router.delete("/courses/:ID", [authenticateUser], function (req, res) {
    //remove method of mongoose
    req.course.remove(function (err) {
        if (err) return next(err);
        res.sendStatus(204);
    });
})

module.exports = router;
