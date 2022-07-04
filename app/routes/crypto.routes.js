module.exports = app => {
    const crypto = require("../controllers/crypto.controller.js");
    var router = require("express").Router();
    // Create a new Crpyto
    router.post("/", crypto.create);
    // Retrieve all crypto
    router.get("/", crypto.findAll);
    // Retrieve a single Crpyto with id
    router.get("/:id", crypto.findOne);
    // Update a Crpyto with id
    router.put("/:id", crypto.update);
    // Delete a Crpyto with id
    router.delete("/:id", crypto.delete);
    // Delete all crypto
    router.delete("/", crypto.deleteAll);
    app.use('/api/crypto', router);
};
