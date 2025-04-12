const mongoose = require('mongoose');

const Record = new mongoose.Schema({
    "structure": {
        "type": { "type": String, "required": true },
        "address": {
            "street": { "type": String, "required": true },
            "city": { "type": String, "required": true },
            "state": { "type": String, "required": true },
            "zip": { "type": String, "required": true },
            "coordinates": {
                "lat": { "type": Number, "required": false },
                "lng": { "type": Number, "required": false }
            }
        },
        "pictures": [
            {
                "url": { "type": String, "required": false },
                "caption": { "type": String, "required": false }
            }
        ]
    },
    "extermination": {
        "date": { "type": Date, "required": true },
        "time": { "type": String, "required": true },
        "pesticideUsed": {
            "name": { "type": String, "required": true },
            "quantity": { "type": Number, "required": true },
            "unit": { "type": String, "required": true }
        },
        "targetPest": { "type": String, "required": true },
        "method": { "type": String, "required": false }
    },
    "exterminator": {
        "name": { "type": String, "required": true },
        "contactInfo": {
            "phone": { "type": String, "required": true },
            "email": { "type": String, "required": false }
        }
    },
    "exterminatorId": { "type": mongoose.Schema.Types.ObjectId, "ref": "Exterminator", "required": true },
    "notes": { "type": String, "required": false },
    "createdAt": { "type": Date, "required": true, "default": Date.now },
    "updatedAt": { "type": Date, "required": true, "default": Date.now }
})

module.exports = mongoose.model('Record', Record);