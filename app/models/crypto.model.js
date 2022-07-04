const sql = require("./db.js");
// constructor
const Crpyto = function(crpyto) {
    this.symbol = crpyto.symbol;
    this.symbolName = crpyto.symbolName;
    this.buy = crpyto.buy;
    this.sell = crpyto.sell;
    this.changeRate = crpyto.changeRate;
    this.changePrice = crpyto.changePrice;
    this.high = crpyto.high;
    this.low = crpyto.low;
    this.vol = crpyto.vol;
    this.volValue = crpyto.volValue;
    this.last = crpyto.last;
    this.averagePrice = crpyto.averagePrice;
    this.takerFeeRate = crpyto.takerFeeRate;
    this.makerFeeRate = crpyto.makerFeeRate;
    this.takerCoefficient = crpyto.takerCoefficient;
    this.makerCoefficient = crpyto.makerCoefficient;

};
Crpyto.create = (newCrpyto, result) => {
    sql.query("INSERT INTO crypto SET ?", newCrpyto, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created crpyto: ", { id: res.insertId, ...newCrpyto });
        result(null, { id: res.insertId, ...newCrpyto });
    });
};
Crpyto.findById = (id, result) => {
    sql.query(`SELECT * FROM crypto WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found crpyto: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Crpyto with the id
        result({ kind: "not_found" }, null);
    });
};
Crpyto.getAll = (symbol, result) => {
    let query = "SELECT * FROM crypto";
    if (symbol) {
        query += ` WHERE symbol LIKE '%${symbol}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("crypto: ", res);
        result(null, res);
    });
};

Crpyto.updateById = (id, crpyto, result) => {
    sql.query(
        "UPDATE crypto SET symbol = ?, buy = ?, sell = ?, WHERE id = ?",
        [crpyto.symbol, crpyto.buy, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Crpyto with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated crpyto: ", { id: id, ...crpyto });
            result(null, { id: id, ...crpyto });
        }
    );
};
Crpyto.remove = (id, result) => {
    sql.query("DELETE FROM crypto WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Crpyto with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted crpyto with id: ", id);
        result(null, res);
    });
};
Crpyto.removeAll = result => {
    sql.query("DELETE FROM crypto", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} crypto`);
        result(null, res);
    });
};
module.exports = Crpyto;
