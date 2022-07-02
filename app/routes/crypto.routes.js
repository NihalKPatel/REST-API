module.exports = app => {
    const crypto = require("../controllers/crypto.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", crypto.create);
    // Retrieve all crypto
    router.get("/", crypto.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", crypto.findOne);
    // Update a Tutorial with id
    router.put("/:id", crypto.update);
    // Delete a Tutorial with id
    router.delete("/:id", crypto.delete);
    // Delete all crypto
    router.delete("/", crypto.deleteAll);
    app.use('/api/crypto', router);
};
