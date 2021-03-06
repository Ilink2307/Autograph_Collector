const oracledb = require("oracledb")

function getLoggedUserStatistics() {
    let loggedUserID = 4; //de luat id-ul din file ul cu tokenul
    return new Promise ((resolve, reject) => {
        const info = getLoggedUserStatisticsFromBD(loggedUserID);
        resolve(info);
    })
}


async function getUserPoints(connection, username) {
    try {
        let userID = getUserIDByUsername(connection, username);
        return await getUserPointsByID(connection, userID);
    } catch (error) {
        console.error(error);
    }
}

async function getUserIDByUsername(connection, username) {
    try {
        let idQuery = `SELECT ID_USER FROM ACCOUNTS WHERE USERNAME = :username`;
        let idQueryResult = await connection.execute(
            idQuery, [username],
            { autoCommit: true });
        return idQueryResult.rows[0][0]

    } catch (error) {
        console.error(error);
    }
}

async function getUserPointsByID(connection, userID) {
    try {
        let sumQuery = `SELECT SUM(POINTS) FROM ALL_AUTOGRAPHS_V2 WHERE ID_USER = :userID`
        let sumQueryResult = await connection.execute(
            sumQuery, [userID],
            { autoCommit: true });

        return sumQueryResult.rows[0][0];

    } catch (error) {
        console.error(error);
    }
}

async function getLoggedUserStatisticsFromBD(loggedUserID) {
    let connection;
    try {
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});

        let numberOfAutographs = await getNumberOfAutographs(connection, loggedUserID);

        if(numberOfAutographs) {
            let topThreeMostValuableAutographsData = await getTopThreeMostValuableAutographsData(connection, loggedUserID)
            let mostValuableAutographsData = await getMostValuableAutographsData(connection, loggedUserID);
            let totalValueOfAutographs = await getTotalValueOfAutographs(connection, loggedUserID);
            let mostFrequentAuthor = await getMostFrequentAuthor(connection, loggedUserID);

            await connection.close;

            return {
                numberOfAutographs: numberOfAutographs,
                mostValuableAutographsAuthorsName: mostValuableAutographsData.authorsName,
                mostValuableAutographsPoints: mostValuableAutographsData.maxPoints,
                totalValueOfAutographs: totalValueOfAutographs,
                topThreeMostValuableAutographsData: topThreeMostValuableAutographsData,
                mostFrequentAuthor: mostFrequentAuthor
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

async function getMostFrequentAuthor(connection, loggedUserID) {
    try {
        let authorIDQuery = `select counter1.ID_AUTHOR
            from (select COUNT(*) as total, ID_AUTHOR
                from ALL_AUTOGRAPHS_V2
                group by ID_AUTHOR) counter1,
            (select MAX(total) as maxtotal from 
                    (select COUNT(*) as total, ID_AUTHOR from ALL_AUTOGRAPHS_V2 where ID_USER = :loggedUserID group by ID_AUTHOR)) counter2
                        where counter1.total = counter2.maxtotal`

        let authorIDResult = await connection.execute(
            authorIDQuery, [loggedUserID],
            { autoCommit: true });
        let authorID = authorIDResult.rows[0][0];

        let authorNameQuery =  `SELECT AUTHOR FROM AUTOGRAPH_AUTHORS WHERE ID_AUTHOR = :authorID`
        let authorNameResult = await connection.execute(
            authorNameQuery, [authorID],
            { autoCommit: true });
        let authorName = authorNameResult.rows[0][0];

        let numberQuery = `SELECT COUNT(*) FROM ALL_AUTOGRAPHS_V2 WHERE ID_USER = :loggedUserID AND ID_AUTHOR = :authorID`
        let numberQueryResult = await connection.execute(
            numberQuery, [loggedUserID, authorID],
            { autoCommit: true });
        let number = numberQueryResult.rows[0][0];

        return { authorName, number}

    } catch (error) {
        console.error(error);
    }
}

async function getTopThreeMostValuableAutographsData(connection, loggedUserID) {
    try {
        let firstAuthorName = null;
        let secondAuthorName = null;
        let thirdAuthorName = null;


        let firstAutoQuery = `SELECT ID_AUTHOR FROM (SELECT * FROM (SELECT * FROM ALL_AUTOGRAPHS_V2 WHERE ID_USER = :A) ORDER BY POINTS DESC) WHERE ROWNUM <= 1`
        let firstAutoQueryResult = await connection.execute(
            firstAutoQuery, [loggedUserID],
            { autoCommit: true });
        let firstAutoData = firstAutoQueryResult.rows[0][0];
        console.log("first auto data: " + firstAutoData);

        let firstAuthorNameQuery =  `SELECT AUTHOR FROM AUTOGRAPH_AUTHORS WHERE ID_AUTHOR = :authorID`
        let firstAuthorNameResult = await connection.execute(
            firstAuthorNameQuery, [firstAutoData],
            { autoCommit: true });
        firstAuthorName = firstAuthorNameResult.rows[0][0];

        let secondAutoQuery = `SELECT ID_AUTHOR FROM (SELECT * FROM (SELECT * FROM
                (SELECT * FROM ALL_AUTOGRAPHS_V2 WHERE ID_USER = :a ORDER BY POINTS DESC)
                                              WHERE ROWNUM <= 2) order by POINTS) WHERE ROWNUM <=1`

        let secondAutoQueryResult = await connection.execute(
            secondAutoQuery, [loggedUserID],
            { autoCommit: true });

        let secondAutoData = null;

        if(secondAutoQueryResult.rows[0]) {
            secondAutoData = secondAutoQueryResult.rows[0][0];
            console.log("second a data: " + secondAutoData);

            let secondAuthorNameQuery =  `SELECT AUTHOR FROM AUTOGRAPH_AUTHORS WHERE ID_AUTHOR = :authorID`
            let secondAuthorNameResult = await connection.execute(
                secondAuthorNameQuery, [secondAutoData],
                { autoCommit: true });
            secondAuthorName = secondAuthorNameResult.rows[0][0];

            let thirdAutoQuery = `SELECT ID_AUTHOR FROM (SELECT * FROM (SELECT * FROM
                    (SELECT * FROM ALL_AUTOGRAPHS_V2 WHERE ID_USER = :a ORDER BY POINTS DESC)
                                                                WHERE ROWNUM <= 3) order by POINTS) WHERE ROWNUM <=1`

            let thirdAutoQueryResult = await connection.execute(
                thirdAutoQuery, [loggedUserID],
                { autoCommit: true });

            let thirdAutoData;
            if(thirdAutoQueryResult.rows[0]) {
                thirdAutoData = thirdAutoQueryResult.rows[0][0];

                let thirdAuthorNameQuery =  `SELECT AUTHOR FROM AUTOGRAPH_AUTHORS WHERE ID_AUTHOR = :authorID`
                let thirdAuthorNameResult = await connection.execute(
                    thirdAuthorNameQuery, [thirdAutoData],
                    { autoCommit: true });
                thirdAuthorName = thirdAuthorNameResult.rows[0][0];
            }
        }

        return {
            firstAuthor: firstAuthorName,
            secondAuthor: secondAuthorName,
            thirdAuthor: thirdAuthorName }

    } catch (error) {
        console.error(error);
    }
}

async function getMostValuableAutographsData(connection, loggedUserID) {
    try {
        let maxValueQuery = `SELECT MAX(POINTS) FROM ALL_AUTOGRAPHS_V2 WHERE ID_USER = :loggedUserID`;
        let maxValueResult = await connection.execute(
            maxValueQuery, [loggedUserID],
            { autoCommit: true });
        let maxValue = maxValueResult.rows[0][0];

        let authorIDQuery = `SELECT ID_AUTHOR FROM ALL_AUTOGRAPHS_V2 WHERE POINTS = :maxValue AND ID_USER = :loggedUserID`;
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
        let totalValueQuery = `SELECT SUM(POINTS) FROM ALL_AUTOGRAPHS_V2 WHERE ID_USER = :loggedUserID`;

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
        let numberOfAutographsQuery = `SELECT COUNT(*) FROM ALL_AUTOGRAPHS_V2 WHERE ID_USER = :loggedUserID`;

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