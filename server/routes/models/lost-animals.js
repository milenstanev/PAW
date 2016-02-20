var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var lostAnimalsModel = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    user: {
        type: String
    },
    animal: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('lostAnimals', lostAnimalsModel);