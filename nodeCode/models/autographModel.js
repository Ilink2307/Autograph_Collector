const oracledb = require("oracledb")
const mediumImportance = 5;

async function addAutograph(autograph){
    return new Promise(async (resolve, reject) => {
        const addResponse = await addAutographInBD(autograph);
        resolve(addResponse);
    })
}

async function addAutographInBD(autograph) {
    let connection;
    try {
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});

        let uploadObject = await computeUploadObject(connection, autograph);

        console.log(uploadObject); //tetsing

        let insertQuery = `INSERT INTO ALL_AUTOGRAPHS_V2 VALUES (:a, :b, :c, :d, :e, :f, :g, :h, :i)`
        await connection.execute(
            insertQuery,
            [
                uploadObject.autographID,
                uploadObject.userID,
                uploadObject.authorID,
                uploadObject.itemID,
                uploadObject.moment,
                uploadObject.mentions,
                uploadObject.pts,
                uploadObject.autographDate,
                uploadObject.autographPhoto
            ],
            { autoCommit: true }
        );

        await connection.close;
        return "add successfully computed";
    }
    catch (error){
        console.error(error);
        return "add failed in db";
    }
}

async function computeUploadObject(connection, autograph) {
    let autographID = await getNewAutographID(connection);
    let userID = autograph.idUser;
    let authorID = await getAuthorIDAndUpdateDBIfNew(connection, autograph.author);
    let itemID = await getItemIDAndUpdateDBIfNew(connection, autograph.autographItem);
    let moment = autograph.moment;
    let mentions = autograph.mentions;
    let pts = await computePointsForAutograph(connection, authorID, itemID, mentions);
    let autographDate = autograph.autographDate;
    let autographPhoto = autograph.photo;

    return {
        autographID,
        userID,
        authorID,
        itemID,
        moment,
        mentions,
        pts,
        autographDate,
        autographPhoto
    }
}

async function getItemIDAndUpdateDBIfNew(connection, autographItem) {
    let itemID;

    let itemIDQuery = `SELECT ID_ITEM FROM ITEMS WHERE ITEM_NAME = :a`;
    let itemIDResult = await connection.execute(
        itemIDQuery,
        [autographItem],
        { autoCommit: true }
    )

    if(itemIDResult.rows[0]) {
        itemID = itemIDResult.rows[0][0];
    }
    else {
        let maxIdQuery = `SELECT COUNT(*) FROM ITEMS`;
        const results = await connection.execute(maxIdQuery);
        itemID = results.rows[0][0] + 1;

        let newItemQuery = `INSERT INTO ITEMS VALUES (:a, :b, :c)`;
        await connection.execute(
            newItemQuery,
            [itemID, mediumImportance, autographItem],
            { autoCommit: true }
        )
    }
    return itemID;
}

async function getAuthorIDAndUpdateDBIfNew(connection, author) {
    let authorID;

    let authorIDQuery =  `SELECT ID_AUTHOR FROM AUTOGRAPH_AUTHORS WHERE AUTHOR = :a`
    let authorIDResult = await connection.execute(
        authorIDQuery, [author],
        { autoCommit: true });

    if(authorIDResult.rows[0]) {
        authorID = authorIDResult.rows[0][0];
    }
    else {
        let maxIdQuery = `SELECT COUNT(*) FROM AUTOGRAPH_AUTHORS`;
        const results = await connection.execute(maxIdQuery);
        authorID = results.rows[0][0] + 1;

        let newAuthorQuery = `INSERT INTO AUTOGRAPH_AUTHORS VALUES (:a, :b, :c, :d)`;
        await connection.execute(
            newAuthorQuery,
            [authorID, author, 'general', mediumImportance],
            { autoCommit: true }
        )
    }
    return authorID;
}

async function getNewAutographID(connection) {
    let maxIdQuery = `SELECT COUNT(*) FROM ALL_AUTOGRAPHS_V2`;
    const results = await connection.execute(maxIdQuery);
    return results.rows[0][0] + 1;
}

async function computePointsForAutograph(connection, authorID, itemID, mentions) {
    let pts = 0;
    let authorImportance;
    let itemImportance;
    let mentionsExist = false;

    if(mentions) {
        mentionsExist = true;
    }

    let authorImportanceQuery = `SELECT IMPORTANCE FROM AUTOGRAPH_AUTHORS WHERE ID_AUTHOR = :a`;
    let authorImportanceResult = await connection.execute(
        authorImportanceQuery,
        [authorID],
        { autoCommit: true }
    )
    authorImportance = authorImportanceResult.rows[0][0];

    let itemImportanceQuery = `SELECT IMPORTANCE FROM ITEMS WHERE ID_ITEM = :a`;
    let itemImportanceResult = await connection.execute(
        itemImportanceQuery,
        [itemID],
        { autoCommit: true }
    )
    itemImportance = itemImportanceResult.rows[0][0];

    pts = 7 * authorImportance + 3 * itemImportance;

    if (mentionsExist) {
        pts = pts + 5/100 * pts;
    }
    return Math.floor(pts);
}

module.exports = {
    addAutograph
}