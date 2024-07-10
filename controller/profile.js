const Profile = require("../models/profile");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

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


// figure out which routes I need to restrict
exports.profileGet = asyncHandler(async (req, res, next) => {
    console.log("get");
    const allProfiles = await Profile.find().exec();

    res.send(allProfiles);
})

exports.profilePost = asyncHandler(async (req, res, next) => {
    try {
        const profile = await Profile.find({ username: req.body.username });
        if (profile.length > 0) {
            return res.status(400).send('Profile already exists');
        }

        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) {
                return next(err); 
            }

            try {
                const newProfile = new Profile({
                    username: req.body.username,
                    password: hashedPassword,
                    friends: [],
                    setup: false,
                    request: [],
                });
                const savedProfile = await newProfile.save();
                return res.send('Profile created successfully');
            } catch (err) {
                return next(err);
            }
        });
    } catch (err) {
        return next(err);
    }
});

