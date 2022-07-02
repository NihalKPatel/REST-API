const sql = require("./db.js");
// constructor
const Tutorial = function(tutorial) {
    this.ticker = tutorial.ticker;
    this.current_price = tutorial.current_price;
};
Tutorial.create = (newTutorial, result) => {
    sql.query("INSERT INTO crypto SET ?", newTutorial, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
        result(null, { id: res.insertId, ...newTutorial });
    });
};
Tutorial.findById = (id, result) => {
    sql.query(`SELECT * FROM crypto WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};
Tutorial.getAll = (ticker, result) => {
    let query = "SELECT * FROM crypto";
    if (ticker) {
        query += ` WHERE ticker LIKE '%${ticker}%'`;
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

Tutorial.updateById = (id, tutorial, result) => {
    sql.query(
        "UPDATE crypto SET ticker = ?, current_price = ? WHERE id = ?",
        [tutorial.ticker, tutorial.current_price, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated tutorial: ", { id: id, ...tutorial });
            result(null, { id: id, ...tutorial });
        }
    );
};
Tutorial.remove = (id, result) => {
    sql.query("DELETE FROM crypto WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted tutorial with id: ", id);
        result(null, res);
    });
};
Tutorial.removeAll = result => {
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
module.exports = Tutorial;
