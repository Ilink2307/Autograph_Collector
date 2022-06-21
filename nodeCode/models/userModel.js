const oracledb = require("oracledb");

async function registerUserBD(person){
    return new Promise(async (resolve, reject) =>{
        const newUser = person;
        await addUserInOracleBD(newUser);
        resolve(newUser);
    })
}

async function findUserIDByUsername(username, password){
    return new Promise(async (resolve, reject) =>{
        const userID = await findUserIDInBD(username, password);
        resolve(userID);
    })
}

function encodeUserData(username, password, userID){
    let userDataToToken = '';
    let stringUserID = userID.toString();
    let token = userDataToToken.concat(username, password, stringUserID)
    let encodedToken = btoa(token);

    console.log("The Token", token);
    console.log("Encoded Token", encodedToken);

    return encodedToken;
}

async function updateToken(username, password, tokenValue){
    return new Promise(async(resolve, reject) =>{
        await updateTokenInBD(username, password, tokenValue);
        resolve(tokenValue);
    })
}

async function updateTokenInBD(username, password, tokenValue){
    let connection;
    try{
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});
        console.log("se face update la token");
        console.log(username, password, tokenValue);

        let query = `UPDATE ACCOUNTS_V2 SET TOKEN = :tokenValue WHERE USERNAME = :username AND  PASS = :password`;

        await connection.execute(
            query, [tokenValue, username, password],
            { autoCommit: true });

    }
    catch (error) {
        console.error(error);
    }
}
async function findUserIDInBD(username, password){
    let connection;
    try{
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});
        console.log("se cauta id-ul user");

        let query = `SELECT ID_USER FROM ACCOUNTS_V2 WHERE USERNAME = :username AND  PASS = :password`;

        let findResult = await connection.execute(
            query, [username, password],
            { autoCommit: true });

        return findResult;
    }
    catch (error) {
        console.error(error);
    }
}

async function findIfUserExistsByUsername(username, password){
    return new Promise(async (resolve, reject) =>{
        const userExists = await findIfUserExistsInBD(username, password);
        resolve(userExists);
    })
}

async function findIfUserExistsInBD(username, password){
    let connection;
    try{
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});
        console.log("se cauta user");

        let query = `SELECT USERNAME FROM ACCOUNTS_V2 WHERE USERNAME = :username AND  PASS = :password`;

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

        let maxIdQuery = `SELECT COUNT(*) FROM ACCOUNTS_V2`;
        const results = await connection.execute(maxIdQuery);

        let id = results.rows[0][0] + 1;
        let email = newUser.email;
        let username = newUser.username;
        let password = newUser.password;
        let query = `INSERT INTO ACCOUNTS_V2 VALUES (:id, :email, :username, :password, :token)`;

        let result = await connection.execute(
            query, [id, email, username, password, null],
            { autoCommit: true });

        await connection.close;
    }
    catch (error){
        console.error(error);
    }
}

getNumberOfAccounts =  async function(connection, query){
    return new Promise(async function(resolve, reject){
        await connection.query(
            query,
            await async function(err, rows){
                if(rows === undefined){
                    reject(new Error("Error rows is undefined"));
                }else{
                    resolve(rows);
                }
            }
            )
    }
    )
}

module.exports = {
    registerUserBD,
    findIfUserExistsByUsername,
    findUserIDByUsername,
    encodeUserData,
    updateToken
}

