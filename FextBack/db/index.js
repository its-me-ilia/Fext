require('dotenv').config({
    path: '../.env'
});
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(()=> {
        console.log('Connection To DB Established');
    })
    .catch(err => {
        console.log(`Error With DB ${err.message}`);
    });

const schemas = require('./schemas');
const models = {};
for(const schemaName in schemas){
    models[schemaName] = mongoose.model(schemaName,schemas[schemaName]);
};

module.exports = {
    models
};
