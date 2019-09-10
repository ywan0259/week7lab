const mongoose = require('mongoose');

let developSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        firstname:{
            type: String,
            required:true
        },
        lastname:String
    },
    level:{
        type: String,
        required: true
    },
    address:{
        state:String,
        suburb:String,
        street:String,
        unit:Number
    }

});
let developModel=mongoose.model('developer',developSchema,'developer');
module.exports=developModel;