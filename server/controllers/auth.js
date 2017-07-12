const express = require("express");
const validator = require("validator");
const passport = require('passport');
const router =  new express.Router();

function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = "";

    if (!payload || typeof payload.username !== "string" || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.username = 'Please provide a username.';
    }

    if (!payload || typeof payload.password !== "string" || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.username = 'Passwords must have at least 8 chars';
    }

    if (!isFormValid) {
        message = "Check the form for errors";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = ""

    if (!payload || typeof payload.username !== "string" || payload.username.trim().length === 0) {
        isFormValid = false;
        errors.username = 'Please provide a username.';
    }

    if (!payload || typeof payload.password !== "string" || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.username = 'Passwords must have at least 8 chars';
    }

    if (!isFormValid) {
        message = "Check the form for errors";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post("/signup", (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate("local-signup", (err) => {
        if (err) {
            if (err.name === "MongoError" && err.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: "Check the form for errors",
                    errors: {
                        username: "This username is already taken"
                    }
                });
            }
            return res.status(400).json({
                success: false,
                message: "Could not process the form"
            })
        }
        return res.status(200).json({
            success: true,
            messsage: "You have successfully signed up"
        });
    })(req, res, next);
});

router.post("/login", (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate("local-login", (err, token, accountData) => {
        if (err) {
            if (err.username === "IncorrectCredentialsError") {
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            }

            return res.status(400).json({
                success: false,
                message: "Could not process the form."
            })
        }
        return res.json({
            success: true,
            message: "You have successfully logged in!",
            token,
            account: accountData
        });
    })(req, res, next);
});

module.exports = router;