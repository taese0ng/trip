import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        required: 'Email is required',
        validate: [validator.isEmail]
    },

    kakaoId : Number,
    selections : [String]
})

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

const model = mongoose.model('User', userSchema);

export default model;
