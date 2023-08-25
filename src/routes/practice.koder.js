const express = require("express");
const practices = require("../usecases/practice_usecase");
const router = express.Router()


router.get("/", async (request, response) =>{
    try{
        const allPractices = await practices.getAll()
        response.json({
            message : "koders List",
            data: {
                allPractices
            }
        })

    }catch(error){
        response.status(500)
        response.json({
            message: "Something went wrong",
            error: error.message
        })

    }
})

router.post("/", async (request, response) =>{
    try{
        const dataPractice = request.body
        const newPractice = await practices.create(dataPractice)
        response.status(201)
        response.json({
            message: "Practice Created",
            data:{
                Practice: newPractice
            }
        })
    }catch(error){
        const status = error.name === "ValidationError" ? 400 : 500;
        response.status(status)
        response.json({
            message: "something went wrong",
            error: error.message

        })

    }
} )

router.get("/:id",async (request, response) => {
    try{
        const id = request.params;
        const practice = await practices.getById(id)
        response.json({
            message: `Practice ${practices.id}`,
            data:{practice}
        })
    }catch(error){
        response.status(error.status || 500)
        response.json({
            message: "something went wrong",
            error: error.message
        })

    }
})

router.delete("/:id", async (request, response) =>{
    try{
        const { id } = request.params;
        const practiceDeleted = await practices.deleteById(id)
        response.json({
            message: `Practice ${practices.id}`,
            data: {practiceDeleted}
        })
    }catch(error){
        response.status(error.status || 500)
        response.json({
            message: "something went wrong",
            error: error.message
        })

    }
})

router.patch("/", async(request, response) =>{
    try{
        const { id } = request.params;
        const data = request.body;
        const practiceUpdate = await practices.updateById(id, data)
        response.json({
            message: "practice update",
            data: {
                practice: practiceUpdate,
            }
        })

    }catch(error){
        response.status(error.status || 500)
        response.json({
            message: "something went wrong",
            error: error.message
        })

    }
})

module.exports = router;