const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const passport = require('passport');
const passportConfig = require('./passport_config');
const MongoDBStore = require('connect-mongodb-session')(session);

dotenv.config();

if (!process.env.APP_SECRET) {
    throw Error("App Secret is required in Environment Variables! Create .env file in root directory and Add APP_SECRET");
}

if (!process.env.DB_NAME) {
    throw Error("DB Name is required in Environment Variables! Create .env file in root directory and Add DB_NAME");
}

require('./mongo_connector')();
const sessionStore = new MongoDBStore({
    uri: `mongodb://${process.env.DB_HOST || '127.0.0.1'}:${process.env.FB_PORT || 27017}/${process.env.DB_NAME}`,
    databaseName: process.env.DB_NAME,
    collection: 'sessions',
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000
    }
});

const app = express();

const whitelist = ['']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(null, true);
            //callback(new Error())
        }
    },
    credentials: true
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
passportConfig(passport);
let sess = session({
    key: 'tm_token',
    secret: process.env.APP_SECRET,
    store: sessionStore,
    name: 'tm_token',
    touchAfter: 24 * 3600, resave: true, saveUninitialized: true, autoRemove: 'native',
    cookie: {secure: false, maxAge: new Date().getTime() + (60 * 60 * 24 * 1000 * 7)},
});
app.use(sess);
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/api/v1/', usersRouter);

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({'status': 'Error', 'message': err.message || 'Something went wrong!'});
})

module.exports = app;
