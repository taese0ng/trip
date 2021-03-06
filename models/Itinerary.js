import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "Creator is required"
    },
    title : {
        type : String,
        reqruied: "Title is Required"
    },
    description : String,
    createdAt : {
        type: Date,
        default : Date.now
    },
    routes : [
        {
            type: Map,
            of: String
        }
    ],
    publish: {
        type: Boolean,
        default: false
    },
    /*
    date : {
        type : String,
        required : "Date is Required"
    }

    */
})

const model = mongoose.model('Itinerary', itinerarySchema);

export default model;
