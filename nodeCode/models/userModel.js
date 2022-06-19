const { v4: uuidv4} = require('uuid');
const oracledb = require("oracledb");

function registerUserBD(person){
    return new Promise((resolve, reject) =>{
        const newUser = person;
        addUserInOracleBD(newUser);
        resolve(newUser);
    })
}

function findIfUserExistsByUsername(username, password){
    return new Promise((resolve, reject) =>{
        const userExists = findIfUserExistsInBD(username, password);
        resolve(userExists);
    })
}

module.exports = {
    registerUserBD,
    findIfUserExistsByUsername
}

async function findIfUserExistsInBD(username, password){
    let connection;
    try{
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});
        console.log("se cauta user");

        let query = `SELECT USERNAME FROM ACCOUNTS WHERE USERNAME = :username AND  PASS = :password`;

        let result = await connection.execute(
            query, [username, password],
            { autoCommit: true });

        if(result.rows[0]){
            await connection.close;
            return true;
        }
        else {
            await connection.close;
            return false;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
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
        )
    })
}
