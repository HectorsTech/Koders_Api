const mongoose = require("mongoose");
const koderModel = require("../models/koders.model"); // Cambia el nombre de la variable de importación
const createError = require("http-errors")


// GET KODERS
async function getAll() {
    const allKoders = await koderModel.find(); // Usa el nuevo nombre
    return allKoders;
}

// POST /KODERS
async function create(koderData) {    
    const newKoder = await koderModel.create(koderData)
    return newKoder;
}

// GET /KODERS/ID:
async function getById(id) {
    if (!mongoose.isValidObjectId(id)){
        //throw new Error("Invalid id");
        throw new createError(400, "Invalid id")
    }
    const koder = await koderModel.findById(id);
    if(!koder){
        throw new createError(404, "koder not found")
    }
    return koder
    /* const koderExist = koderModel.exists({ id_: id})
    if(!koderExist){
        throw new Error(`koder ${id} does not exist` )
    }
    const koder = await KoderModel.findById(id); // Usa el nuevo nombre
    return koder; */
}

//Delete by Id
async function deleteById(id){

    if(!mongoose.isValidObjectId(id)){
        throw new createError(400, "Invalid id")
    }
    const koderDeleted = await koderModel.findByIdAndDelete(id);
    if(!koderDeleted){
        throw new createError(404, "koder not found")
    }
    return koderDeleted

}
//Update by ID
async function updateById(id, dataToUpdate){
    if(!mongoose.isValidObjectId(id)){
        throw new createError(400, "Invalid id")
    }

    const koderUpdate = await koderModel.findByIdAndUpdate(id, dataToUpdate);

    if(!koderUpdate){
        throw new createError(404, "Koder not found")
    }

    return koderUpdate

}

module.exports = {
    getAll,
    create,
    getById,
    deleteById,
    updateById
};
