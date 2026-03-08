const mongoose=require('mongoose');

const prodSchema=new mongoose.Schema({
    pname:{type:String,required:true},
    pic:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
})

module.exports=mongoose.model('products',prodSchema);