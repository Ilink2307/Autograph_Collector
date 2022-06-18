const { v4: uuidv4} = require('uuid');
const oracledb = require("oracledb");

function registerUserBD(person){
    return new Promise((resolve, reject) =>{
        const newUser = {id: uuidv4(), ...person};
        addUserInOracleBD();
        resolve(newUser);
    })
}

module.exports = {
    registerUserBD
}

async function addUserInOracleBD() {
    let connection;
    try {
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});
        console.log("se adauga user");
        //adauga user in bd
        await connection.close;
    }
    catch (error){
        console.error(error);
    }
}