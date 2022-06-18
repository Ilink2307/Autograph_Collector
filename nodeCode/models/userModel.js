const { v4: uuidv4} = require('uuid');
const oracledb = require("oracledb");

function registerUserBD(person){
    return new Promise((resolve, reject) =>{
        const newUser = person;
        addUserInOracleBD(newUser);
        resolve(newUser);
    })
}

module.exports = {
    registerUserBD
}

async function addUserInOracleBD(newUser) {
    let connection;
    try {
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});
        console.log("se adauga user");

        let maxIdQuery = `SELECT COUNT(*) FROM ACCOUNTS`;
        const results = await connection.execute(maxIdQuery);

        let id = results.rows[0][0] + 1;
        let email = newUser.email;
        let username = newUser.username;
        let password = newUser.password;
        let query = `INSERT INTO ACCOUNTS VALUES (:id, :email, :username, :password)`;


        let result = await connection.execute(
            query, [id, email, username, password],
            { autoCommit: true });

        await connection.close;
    }
    catch (error){
        console.error(error);
    }
}

getNumberOfAccounts = function(connection, query){
    return new Promise(function(resolve, reject){
        connection.query(
            query,
            function(err, rows){
                if(rows === undefined){
                    reject(new Error("Error rows is undefined"));
                }else{
                    resolve(rows);
                }
            }
        )})}
