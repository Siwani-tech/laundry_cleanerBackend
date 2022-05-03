

const moongose= require('mongoose');


const laundrySchema=new moongose.Schema({
    fname: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    preferences:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    sms:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    nopackageselected:{
        type:String,
        required:true
    }
})

const users=moongose.model("users",laundrySchema);
module.exports=users