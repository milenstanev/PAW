var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var messagesModel = new Schema({
    secondaryId: {
      type: String
    },
    user: {
      type: String
    },
    message: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('messages', messagesModel);