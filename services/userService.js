const userModel=require('../models/userModel')

const add=async(data)=>{
    return await userModel.create(data);
}

const get=async()=>{
    return await userModel.find();
}

const getbyid=async(id)=>{
    return await userModel.findbyId(id);
}

const remove=async(id)=>{
    return await userModel.findByIdAndDelete(id);
}

const update=async(id,data)=>{
    return await userModel.findByIdAndUpdate(id,data);
}
module.exports={add,get,getbyid,remove,update}