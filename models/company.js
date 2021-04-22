const mongoose = require( 'mongoose' )
// Company
const company = new mongoose.Schema({
    name : { type: String, required: true},
    nif : { type : String, required: true},
    email : { type : String, required: true},
    password : { type : String, required: true},
    salt : { type : String, required: true},
    category: { type: String, required: true},
    streetnumber:{ type: Number, required: true},
    street:{ type: String, required: true},
    zipcode:{ type: Number, required: true},
    description: { type: String, required: true},
    // Duration needs to be in **minutes**
    service_duration: { type: Number, required: true},
    // Schedule of his services
    schedule: {
        monday: {
            schedule_1: { type: String, required: true},
            schedule_2: { type: String }
        },
        tuesday: {
            schedule_1: { type: String, required: true},
            schedule_2: { type: String }
        },
        wednesday: {
            schedule_1: { type: String, required: true},
            schedule_2: { type: String }
        },
        thursday: {
            schedule_1: { type: String, required: true},
            schedule_2: { type: String }
        },
        friday: {
            schedule_1: { type: String, required: true},
            schedule_2: { type: String }
        },
        saturday: {
            schedule_1: { type: String, required: true},
            schedule_2: { type: String }
        },
        sunday: {
            schedule_1: { type: String, required: true},
            schedule_2: { type: String }
        }
    },
    location: {
        type: { type: String, required: false},
        coordinates: [Number]
    }
});
company.index({coordinates: '2dsphere'})

module.exports = mongoose.model("company", company)