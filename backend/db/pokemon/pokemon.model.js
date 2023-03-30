const mongoose = require("mongoose")

const PokemonSchema = require('./pokemon.schema').PokemonSchema;

const PokemonModel = mongoose.model("PokemonModel", PokemonSchema);

function createPokemon(pokemon) {
    return PokemonModel.create(pokemon);
}

function returnAllPokemon() {
    return PokemonModel.find().exec();
}

function getPokemonById(id) {
    return PokemonModel.findById(id).exec();
}

module.exports = {
    createPokemon,
    returnAllPokemon,
    getPokemonById,
}