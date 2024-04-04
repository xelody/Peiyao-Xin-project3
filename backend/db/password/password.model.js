const mongoose = require("mongoose")

const PasswordSchema = require('./password.schema').PasswordSchema;

const PasswordModel = mongoose.model("PasswordModel", PasswordSchema);

function createEntry(url, password, time, username) {
    return PasswordModel.create({ urlAddress: url, password, time, username });
}

function createShareEntry(url, password, time, username, accessUser) {
    return PasswordModel.create({ urlAddress: url, password, time, username, accessUser, acceptShareRequest: false });
}

function findExistingEntry(url, username) {
    return PasswordModel.findOne({ urlAddress: url, username: username }).exec();
}

function findPasswordById(passwordId) {
    return PasswordModel.find({ _id: passwordId }).exec();
}

function findByIdAndUpdate(passwordId, password) {
    return PasswordModel.updateOne(
        { _id: passwordId },
        { password: password, time: new Date() },
        { upsert: true }
    ).exec();
}

function findByIdAndAccept(passwordId) {
    return PasswordModel.updateOne(
        { _id: passwordId },
        { acceptShareRequest: true }
    ).exec();
}


function findPasswordByUsername(currUser) {
    return PasswordModel.find({
        username: currUser,
        accessUser: { $exists: false }
    }).exec();
}

function findPasswordByAccessUser(currUser) {
    return PasswordModel.find({ accessUser: currUser, acceptShareRequest: true }).exec();
}

function findAlreadySharedEntry(url, username, accessUser) {
    return PasswordModel.findOne({
        urlAddress: url,
        username: username,
        accessUser: accessUser
    }).exec();
}

function findPendingRequest(username) {
    return PasswordModel.find({ accessUser: username, acceptShareRequest: false });
}

function deletePasswordById(passwordId) {
    return PasswordModel.deleteOne({ _id: passwordId }).exec();
}

module.exports = {
    createEntry,
    createShareEntry,
    findExistingEntry,
    findByIdAndUpdate,
    findByIdAndAccept,
    findPasswordById,
    findPasswordByUsername,
    findPasswordByAccessUser,
    findAlreadySharedEntry,
    findPendingRequest,
    deletePasswordById,
}