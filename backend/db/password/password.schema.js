const Schema = require('mongoose').Schema;

exports.PasswordSchema = new Schema({
    urlAddress: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    time: {
        type: Date,
        default: Date.now,
        require: true,
    },
    username: { 
        type: String,
        require: true,
    },
    accessUser: {
        type: String,
        required: false,
    }
}, { collection : 'myPasswordSpr2023' });

