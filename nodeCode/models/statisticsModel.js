const oracledb = require("oracledb")

function getLoggedUserStatistics() {
    let loggedUserID = 1; //de luat id-ul din file ul cu tokenul
    return new Promise ((resolve, reject) => {
        const info = getLoggedUserStatisticsFromBD(loggedUserID);
        resolve(info);
    })
}

async function getLoggedUserStatisticsFromBD(loggedUserID) {
    let connection;
    try {
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});

        let numberOfAutographs = await getNumberOfAutographs(connection, loggedUserID);

        if(numberOfAutographs) {
            let mostValuableAutographsData = await getMostValuableAutographsData(connection, loggedUserID);
            let totalValueOfAutographs = await getTotalValueOfAutographs(connection, loggedUserID);
            await connection.close;

            return {
                numberOfAutographs: numberOfAutographs,
                mostValuableAutographsAuthorsName: mostValuableAutographsData.authorsName,
                mostValuableAutographsPoints: mostValuableAutographsData.maxPoints,
                totalValueOfAutographs: totalValueOfAutographs
            }
        }

        await connection.close;
        return {
            numberOfAutographs: numberOfAutographs,
            mostValuableAutographsAuthorsName: null,
            mostValuableAutographsPoints: null,
            totalValueOfAutographs: 0
        }

    } catch (error){
        console.error(error);
    }
}

async function getMostValuableAutographsData(connection, loggedUserID) {
    try {
        let maxValueQuery = `SELECT MAX(POINTS) FROM ALL_AUTOGRAPHS WHERE ID_USER = :loggedUserID`;
        let maxValueResult = await connection.execute(
            maxValueQuery, [loggedUserID],
            { autoCommit: true });
        let maxValue = maxValueResult.rows[0][0];

        let authorIDQuery = `SELECT ID_AUTHOR FROM ALL_AUTOGRAPHS WHERE POINTS = :maxValue AND ID_USER = :loggedUserID`;
        let authorIDResult = await connection.execute(
            authorIDQuery, [maxValue, loggedUserID],
            { autoCommit: true });
        let authorID = authorIDResult.rows[0][0];

        let authorNameQuery =  `SELECT AUTHOR FROM AUTOGRAPH_AUTHORS WHERE ID_AUTHOR = :authorID`
        let authorNameResult = await connection.execute(
            authorNameQuery, [authorID],
            { autoCommit: true });

        return {
            authorsName: authorNameResult.rows[0][0],
            maxPoints: maxValue
        };

    } catch (error) {
        console.error(error);
    }
}

async function getTotalValueOfAutographs(connection, loggedUserID) {
    try {
        let totalValueQuery = `SELECT SUM(POINTS) FROM ALL_AUTOGRAPHS WHERE ID_USER = :loggedUserID`;

        let totalValueResult = await connection.execute(
            totalValueQuery, [loggedUserID],
            { autoCommit: true });

        return totalValueResult.rows[0][0];

    } catch (error) {
        console.error(error);
    }
}

async function getNumberOfAutographs(connection, loggedUserID) {
    try {
        let numberOfAutographsQuery = `SELECT COUNT(*) FROM ALL_AUTOGRAPHS WHERE ID_USER = :loggedUserID`;

        let numberOfAutographsResult = await connection.execute(
            numberOfAutographsQuery, [loggedUserID],
            { autoCommit: true });

        return numberOfAutographsResult.rows[0][0];
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getLoggedUserStatistics
}