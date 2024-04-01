const mongoose = require("mongoose")

const PasswordSchema = require('./password.schema').PasswordSchema;

const PasswordModel = mongoose.model("PasswordModel", PasswordSchema);

function createPassword(password) {
    return PasswordModel.create(password);
}

function returnAllPassword() {
    return PasswordModel.find().exec();
}

function getPasswordByUsername(username) {
    return PasswordModel.findByUsername(username).exec();
}

function deletePassword(passwordId) {
    return PasswordModel.deleteOne({_id: passwordId}).exec();
}

function findPokemonByPassword(username) {
    return PasswordModel.find({username: username}).exec();
}

module.exports = {
    createPassword,
    returnAllPassword,
    getPasswordByUsername,
    deletePassword,
    findPokemonByPassword
}