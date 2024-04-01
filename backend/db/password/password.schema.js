const Schema = require('mongoose').Schema;

exports.PasswordSchema = new Schema({
    url: String,
    password: Number,
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
        required: true,
    }
}, { collection : 'myPasswordSpr2023' });

