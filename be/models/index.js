var mongoose = require('mongoose');

const connUri = process.env.MONGO_LOCAL_CONN_URL;
const result = {};
mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex:true }, function (error) {
    if (error) {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
    }
}); // connect to our database