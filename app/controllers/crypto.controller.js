const Crpyto = require("../models/crypto.model.js");
// Create and Save a new Crpyto
exports.create = (req, res) => {

};
// Retrieve all crypto from the database (with condition).
exports.findAll = (req, res) => {

};
// Find a single Crpyto with a id
exports.findOne = (req, res) => {

};
// Update a Crpyto identified by the id in the request
exports.update = (req, res) => {

};
// Delete a Crpyto with the specified id in the request
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
    // Create a Crpyto
    const crpyto = new Crpyto({
        symbol: req.body.symbol,
        symbolName: req.body.symbolName,
        buy: req.body.buy,
        sell: req.body.sell,
        changeRate: req.body.changeRate,
        changePrice: req.body.changePrice,
        high: req.body.high,
        low: req.body.low,
        vol: req.body.vol,
        volValue: req.body.volValue,
        last: req.body.last,
        averagePrice: req.body.averagePrice,
        takerFeeRate: req.body.takerFeeRate,
        makerFeeRate: req.body.makerFeeRate,
        takerCoefficient: req.body.takerCoefficient,
        makerCoefficient: req.body.makerCoefficient,
    });
    // Save Crpyto in the database
    Crpyto.create(crpyto, (err, data) => {
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
    const symbol = req.query.symbol;
    Crpyto.getAll(symbol, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving crypto."
            });
        else res.send(data);
    });
};


exports.findOne = (req, res) => {
    Crpyto.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Crpyto with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Crpyto with id " + req.params.id
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
    Crpyto.updateById(
        req.params.id,
        new Crpyto(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Crpyto with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Crpyto with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Crpyto.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Crpyto with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Crpyto with id " + req.params.id
                });
            }
        } else res.send({ message: `Crpyto was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Crpyto.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all crypto."
            });
        else res.send({ message: `All crypto were deleted successfully!` });
    });
};
