const Schema = require('mongoose').Schema;

exports.PasswordSchema = new Schema({
    urlAddress: String,
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
    },
    acceptShareRequest: {
        type: Boolean,
        required: false,
    }
}, { collection : 'myPasswordSpr2023' });

