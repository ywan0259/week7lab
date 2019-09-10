const mongoose = require('mongoose');

let taskSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    assign:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'developer'
    },
    due:Date,
    status:String,
    desc:String
});

let taskModel=mongoose.model('task',taskSchema,'task');
module.exports=taskModel;