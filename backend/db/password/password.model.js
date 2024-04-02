const mongoose = require("mongoose")

const PasswordSchema = require('./password.schema').PasswordSchema;

const PasswordModel = mongoose.model("PasswordModel", PasswordSchema);

function createEntry(url, password, time, username) {
    return PasswordModel.create({ urlAddress: url, password, time, username });
}

function returnAllPassword() {
    return PasswordModel.find().exec();
}

function findPasswordByUsername(currUser) {
    return PasswordModel.find({username: currUser}).exec();
}

function deletePassword(passwordId) {
    return PasswordModel.deleteOne({_id: passwordId}).exec();
}

module.exports = {
    createEntry,
    returnAllPassword,
    findPasswordByUsername,
    deletePassword,
}