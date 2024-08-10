const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");



const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO_DB_URL;
main().then(()=>console.log('connected')).catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const profilesRouter = require('./routes/profiles');
const conversationRouter = require('./routes/conversation');
const messageRouter = require('./routes/message');
const loginRouter = require('./routes/login');
const requestRouter = require('./routes/request');


const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/profiles', profilesRouter);
app.use('/conversation', conversationRouter);
app.use('/message', messageRouter);
app.use('/login', loginRouter);
app.use('/request', requestRouter);

module.exports = app;
