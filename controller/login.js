const Profile = require("../models/profile");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const profile = await Profile.findOne({ username: username });
            if (!profile) {
                return done(null, false, { message: "Incorrect username" });
            };
            const match = await bcrypt.compare(password, profile.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" })
            }
            return done(null, profile);
        } catch (err) {
            return done(err);
        };
    })
);

passport.serializeUser((profile, done) => {
    done(null, profile.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const profile = await Profile.findById(id);
        done(null, profile);
    } catch (err) {
        done(err);
    };
});

exports.loginPost = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred during authentication' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        jwt.sign({ user: user }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
            console.log(user);
            if (err) {
                return res.status(500).json({ message: 'Failed to generate token' });
            }
            res.json({
                token: token,
                setup: user.setup,
                profileId: user._id
            });
        });

    })(req, res, next);
});


