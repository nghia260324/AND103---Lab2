const mongoose = require('mongoose');
mongoose.set('strictQuery',true);

const local = 'mongodb://127.0.0.1:27017/NewDatabase';
const connect = async () => {
    try {
        await mongoose.connect(local,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect succes!');
    } catch (err) {
        console.log(err);
    }
}

module.exports = {connect};