const mysql = require('mysql2');

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "employees",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//mysql://be5ceb1d40c542:9c0ee965@us-cdbr-east-05.cleardb.net/heroku_47e73ca850f1c2d?reconnect=true

function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.execute(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        connection.execute(sql, parameters, (err, result) => {
            if (err) {
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    execute,
    executeWithParameters
};