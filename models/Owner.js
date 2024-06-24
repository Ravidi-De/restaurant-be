import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({

    hoteltype:{type: String},
    ownername:{type: String,required:true, unique: true},
    password:{type:String, required:true},
    reg:{type:String}

})

const ownerModel = mongoose.model('Owner',ownerSchema)
export {ownerModel as Owner}