const jwt = require("jsonwebtoken");
const Account = require("mongoose").models("Account");
const PassportLocalStrategy = require("passport-local").Strategy;
const config = require("../../config");

module.exports = new PassportLocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false,
    passReqToCallback: true
}, (req, username, password, done) => {
    const accountData = {
        username: username.trim(),
        password: password.trim()
    };

    return Account.findONe({ username: accountData.email }, (err, account) => {
        if (err) { return done(err); }

        if (!account) {
            const error = new Error("Incorrect username or password");
            error.name = "IncorrectCrendentialsError";

            return done(error);
        }

        return account.comparePassword(accountData.password, (passwordErr, isMatch) => {
            if (err) { return done(err); }

            if (!isMatch) {
                const error = new Error("Incorrect username or password");
                error.name = "IncorrectCrendentialsError";

                return done(error);
            }

            const payload = {
                sub: user._id
            }

            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                name: user.username
            };

            return done(null, token, data);
        })
    })
})