const oracledb = require("oracledb")
const Console = require("console");

function getItems() {
    return new Promise ((resolve, reject) => {
        const info = getItemsFromBD();
        resolve(info);
    })
}

function getTags() {
    return new Promise ((resolve, reject) => {
        const info = getTagsFromBD();
        resolve(info);
    })
}

async function getTagsFromBD() {
    let connection;
    let tagsArray;
    try {
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});

        tagsArray = await getTagsArray(connection);
        return tagsArray;

    } catch (error){
        console.error(error);
    }
}

async function getTagsArray(connection) {
    try {
        let tagsArray = [];
        let numberOfTags = await getNumberOfTags(connection);

        for(let i = 0; i < numberOfTags; ++i) {
            let currentTag = await getNthTagFromBD(connection, i+1);
            tagsArray.push(currentTag);
        }
        await connection.close;
        return tagsArray;
    } catch (error) {
        console.error(error);
    }
}

async function getNumberOfTags(connection) {
    try {
        let query = `SELECT COUNT(*) FROM TAGS`;

        let result = await connection.execute(
            query);
        return result.rows[0][0];

    } catch (error) {
        console.error(error);
    }
}

async function getNthTagFromBD(connection, i) {
    try {
        let query = `SELECT TAG_NAME FROM (SELECT * FROM (SELECT * FROM 
                            (SELECT * FROM TAGS ORDER BY ID_TAG) WHERE ROWNUM <= :a)
                            ORDER BY ID_TAG DESC) WHERE ROWNUM <=1`

        let result = await connection.execute(
            query, [i],
            { autoCommit: true });

        return result.rows[0][0];
    } catch (error) {
        console.error(error);
    }
}

function getPersonalities() {
    return new Promise ((resolve, reject) => {
        const info = getPersonalitiesFromBD();
        resolve(info);
    })
}

async function getPersonalitiesFromBD() {
    let connection;
    let personalitiesArray;
    try {
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});

        personalitiesArray = await getPersonalitiesArray(connection);
        return personalitiesArray;

    } catch (error){
        console.error(error);
    }
}

async function getItemsFromBD() {
    let connection;
    let itemsArray;
    try {
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});

        itemsArray = await getItemsArray(connection);
        return itemsArray;

    } catch (error){
        console.error(error);
    }
}

async function getPersonalitiesArray(connection) {
    try {
        let personalitiesArray = [];
        let numberOfPersonalities = await getNumberOfPersonalities(connection);

        for(let i = 0; i < numberOfPersonalities; ++i) {
            let currentPersonality = await getNthPersonalityFromBD(connection, i+1);
            personalitiesArray.push(currentPersonality);
        }
        await connection.close;
        return personalitiesArray;
    } catch (error) {
        console.error(error);
    }
}

async function getNumberOfPersonalities(connection) {
    try {
        let query = `SELECT COUNT(*) FROM AUTOGRAPH_AUTHORS`;

        let result = await connection.execute(
            query);
        return result.rows[0][0];

    } catch (error) {
        console.error(error);
    }
}

async function getNthPersonalityFromBD (connection, i) {
    try {
        let query = `SELECT AUTHOR FROM (SELECT * FROM (SELECT * FROM 
                            (SELECT * FROM AUTOGRAPH_AUTHORS ORDER BY ID_AUTHOR) WHERE ROWNUM <= :a)
                            ORDER BY ID_AUTHOR DESC) WHERE ROWNUM <=1`

        let result = await connection.execute(
            query, [i],
            { autoCommit: true });

        return result.rows[0][0];
    } catch (error) {
        console.error(error);
    }
}

async function getItemsArray(connection) {
    try {
        let itemsArray = [];
        let numberOfItems = await getNumberOfItems(connection);

        for(let i = 0; i < numberOfItems; ++i) {
            let currentItem = await getNthItemFromBD(connection, i+1);
            itemsArray.push(currentItem);
        }
        await connection.close;
        return itemsArray;
    } catch (error) {
        console.error(error);
    }
}

async function getNthItemFromBD (connection, i) {
    try {
        let query = `SELECT ITEM_NAME FROM (SELECT * FROM (SELECT * FROM 
                            (SELECT * FROM ITEMS ORDER BY ID_ITEM) WHERE ROWNUM <= :a)
                            ORDER BY ID_ITEM DESC) WHERE ROWNUM <=1`

        let result = await connection.execute(
            query, [i],
            { autoCommit: true });

        return result.rows[0][0];
    } catch (error) {
        console.error(error);
    }
}

async function getNumberOfItems(connection) {
    try {
        let query = `SELECT COUNT(*) FROM ITEMS`;

        let result = await connection.execute(
            query);
        return result.rows[0][0];

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getItems,
    getPersonalities,
    getTags
}