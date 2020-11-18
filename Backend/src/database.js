const mongoose = require('mongoose');
// const dotenv = require('dotenv').config();

MONGODB_URI = process.env.MONGODB_HOST + '/' + process.env.MONGODB_DATABASE;
console.log(MONGODB_URI);
mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then((db) => console.log('MongoDB Connected to ' + db.connection.host))
    .catch((err) => console.log('An error has ocurred'+ err));

module.exports = MONGODB_URI;    