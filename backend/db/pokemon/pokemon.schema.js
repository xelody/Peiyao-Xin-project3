const Schema = require('mongoose').Schema;

exports.PokemonSchema = new Schema({
    name: String,
    health: Number,
    color: {
        type: String,
        default: "green",
    },
}, { collection : 'myPokemon' });

