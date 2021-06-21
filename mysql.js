const mysql = require('mysql');
const mysqlConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "task"
}
var pool = mysql.createPool(mysqlConfig);
module.exports.connect = function (cb) {
    return new Promise((resolve, reject) => {
        pool.on('connection', function (connection) {
            connection.on('error', function (err) {
                //logger.error('MySQL error event', err)
                console.log('MySQL error event', err)
            });
            connection.on('close', function (err) {
                console.log('MySQL close event', err);
                //logger.warn('MySQL close event', err)
            });
        });
        resolve()
    })
}
async function executeQuery(query,values) {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query,[values], (e, r, f) => {
                if (e) {
                    reject(e)
                }
                else {
                    //  logger.debug(r, f)
                    resolve(r);
                }
            });
        }
        catch (ex) {
            reject(ex)
        }
    })
}
async function  mysqlQuery (sql, data,next){
    pool.query(sql, [data], function(err,result){
        next(err, result);
        });
}
module.exports.mysqlQuery=mysqlQuery;
module.exports.executeQuery = executeQuery;