import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
    content : {
        type: Number,
        required : "Content Value(id) is required"
    },
    createdAt : {
        type: Date,
        default : Date.now
    },
})

const model = mongoose.model("Content", ContentSchema);

export default model;