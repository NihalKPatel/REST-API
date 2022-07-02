const Tutorial = require("../models/crypto.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {

};
// Retrieve all crypto from the database (with condition).
exports.findAll = (req, res) => {

};
// Find a single Tutorial with a id
exports.findOne = (req, res) => {

};
// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {

};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};
// Delete all crypto from the database.
exports.deleteAll = (req, res) => {

};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Tutorial
    const tutorial = new Tutorial({
        ticker: req.body.ticker,
        current_price: req.body.current_price,
    });
    // Save Tutorial in the database
    Tutorial.create(tutorial, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Crypto."
            });
        else res.send(data);
    });
};

// Retrieve all crypto from the database (with condition).
exports.findAll = (req, res) => {
    const ticker = req.query.ticker;
    Tutorial.getAll(ticker, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving crypto."
            });
        else res.send(data);
    });
};


exports.findOne = (req, res) => {
    Tutorial.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Tutorial.updateById(
        req.params.id,
        new Tutorial(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tutorial with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tutorial with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tutorial with id " + req.params.id
                });
            }
        } else res.send({ message: `Tutorial was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Tutorial.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all crypto."
            });
        else res.send({ message: `All crypto were deleted successfully!` });
    });
};
