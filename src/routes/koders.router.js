const express = require("express");
const koders = require("../usecases/koders_usecase");
const router = express.Router()

router.get("/", async (request, response) => {

    try{
        const allKoders = await koders.getAll()
    response.json({ 
        message: "koders list",
        data: {
            allKoders
        }
    })
    } catch(error){
        response.status(500)
        response.json({
            message: "something went wrong",
            error: error.message
        })

    }
    
})

router.post("/", async(request, response) =>{
    try{
    const koderData = request.body;
    const newKoder = await koders.create(koderData);

    response.status(201)
    response.json({
        message: "Koder created",
        data: {
            koder: newKoder
        }
    })

    } catch(error){
        const status = error.name === "ValidationError" ? 400 : 500
        response.status(status);
        response.json({
            message: "something went wrong",
            error: error.message
        })

    }

})

router.get("/:id", async (request, response) => {
    try{
        const id = request.params.id;
    const koder = await koders.getById(id)

    response.json({
        message: `koder ${koder.id}`,
        data: { koder }
    })
    } catch(error){
        response.status(error.status || 500)
        response.json({
            message: "something went wrong",
            error: error.message
        })
    }

})


router.delete("/:id",async (request, response) => {
    try {
        const { id } = request.params;
        const koderDeleted = await koders.deleteById(id);

        response.json({
            message: "Koder deleted",
            data: {
                koder: koderDeleted
            }
        })

    } catch(error){
        response.status(error.status || 500)
        response.json({
            message: "something went wrong",
            error: error.message
        })
    }

})

router.patch("/:id",async (request, response) =>{
    try{
        const { id } = request.params;
        const data = request.body;
        const koderUpdate = await koders.updateById	(id, data)

        response.json({
            message: "koder update",
            data: {
                koder: koderUpdate,
            }
        })
         
    } catch(error){
        response.status(error.status || 500)
        response.json({
            message: "something went wrong",
            error: error.message
        })

    }
})
 
module.exports = router;

