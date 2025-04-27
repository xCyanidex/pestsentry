const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    structure: {
        serviceType: { type: String, required: true },
        address: {
            street: { type: String, }, 
            city: { type: String,  },   
            state: { type: String,  }, 
            postal: { type: String, }, 
            coordinates: {
                lat: { type: Number, required: false }, 
                lng: { type: Number, required: false }  
            }
        }
    },

    extermination: {
        date: { type: Date, },     
        time: { type: String, },    
        pesticideUsed: {
            name: { type: String, },  
            quantity: { type: Number, },
            unit: { type: String, },
        },
        coordinates: {
            longitude: { type: String },
            latitude: { type: String },
        },
        targetPest: { type: String, }, 
        method: { type: String, required: false },
        pictures: {
            type: [String],
            default: [],
        }     
    },

    exterminator: {
        name: { type: String},     
        phone: { type: String }     
    },

    customer: {
        name: { type: String,}, 
        phone: { type: String,},    
        email: { type: String, }     
    },

    notes: { type: String, required: false },     

    
    exterminatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exterminationReport:{type:String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Record', RecordSchema);
