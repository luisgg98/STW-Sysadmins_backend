const mongoose = require( 'mongoose' );
// Healthzone
const healthzone = new mongoose.Schema({
    name : { type: String, required: true},
    newcases : { type : Number, required: false},
    percentage : { type : Number, required: false},
    ZBSwithCases : { type : Number, required: false},
    radius : { type : Number, required: false}
});
healthzone.index({location: '2dsphere'});

module.exports = mongoose.model("healthzone", healthzone)