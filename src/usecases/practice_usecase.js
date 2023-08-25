const mongoose = require("mongoose")
const practiceModel = require("../models/practice.model")
const createError = require("http-errors")

//GET PRACTICAS
async function getAll(){
    const allPractices = await practiceModel.find()
    return allPractices
}
//POST PRACTICAS
async function create(practiceData){
    const newPractice = await practiceModel.create(practiceData)
    return newPractice
}

//GET PRACTICAS BY ID
async function getById(id){
    if(!mongoose.isValidObjectId(id)){
        throw new createError(400,"Invalid Id") 
    }
    const practice = await practiceModel.findById(id);
    if(!practice){
        throw new createError(404, "Practice not found")
    }
    return practice
}

//Delete by ID
async function deleteById(id){
    if(!mongoose.isValidObjectId(id)){
        throw new createError(400, "Invalid Id")
    }
    const practiceDeleted = await practiceModel.findByIdAndDelete(id)
    if(!practiceDeleted){
        throw new createError(404, "Practice not found")
    }
    return practiceDeleted
}

//Update by id 

async function updateById(id){
    if(!mongoose.isValidObjectId(id)){
        throw new createError(400, "Invalid Id")
    }
    const practiceUpdated = await practiceModel.findByIdAndUpdate(id)
    if(!practiceUpdated){
        throw new createError(404, "Practice not found")
    }
    return practiceUpdated

}


module.exports = {
    getAll,
    create,
    getById,
    deleteById,
    updateById
} 
