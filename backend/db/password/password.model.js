const mongoose = require("mongoose")

const PasswordSchema = require('./password.schema').PasswordSchema;

const PasswordModel = mongoose.model("PasswordModel", PasswordSchema);

function createEntry(url, password, time, username) {
    return PasswordModel.create({ urlAddress: url, password, time, username });
}

function createShareEntry(url, password, time, username, accessUser) {
    return PasswordModel.create({ urlAddress: url, password, time, username, accessUser });
}

function findExistingEntry(url, username) {
    return PasswordModel.findOne({urlAddress: url, username: username}).exec();
}

function findByIdAndUpdate(passwordId, password) {
    PasswordModel.updateOne({_id: passwordId}, {password: password}, {upsert: true}).exec();

    return PasswordModel.find({_id:passwordId}).exec();
}

function findPasswordById(passwordId) {
    return PasswordModel.find({_id: passwordId}).exec();
}

function findPasswordByUsername(currUser) {
    return PasswordModel.find({
        username: currUser,
        accessUser: { $exists: false }
    }).exec();
}

function findPasswordByAccessUser(currUser) {
    return PasswordModel.find({accessUser: currUser}).exec();
}

function findAlreadySharedEntry(url, username, accessUser) {
    return PasswordModel.find({urlAddress: url}, {username: username}, {accessUser: accessUser}).exec();
}

function deletePasswordById(passwordId) {
    return PasswordModel.deleteOne({_id: passwordId}).exec();
}

module.exports = {
    createEntry,
    createShareEntry,
    findExistingEntry,
    findByIdAndUpdate,
    findPasswordById,
    findPasswordByUsername,
    findPasswordByAccessUser,
    findAlreadySharedEntry,
    deletePasswordById,
}