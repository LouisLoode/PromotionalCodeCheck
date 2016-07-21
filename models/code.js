var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var CodeSchema = new Schema({
  code: {
        type: String,
        unique: true,
        required: true
    },
  created: {
        type: Date,
        default: Date.now
    },
  update: [Date],
  status:  Boolean
});

module.exports = mongoose.model('Code', CodeSchema);
