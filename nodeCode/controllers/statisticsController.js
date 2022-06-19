const Statistics = require('../models/statisticsModel')

async function getUserStatistics(req, res) {
    try {
        let body ='';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            const  userStatistics = await Statistics.getLoggedUserStatistics();
            console.log(userStatistics)
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(userStatistics))
        })
    } catch (error){
        console.log(error);
    }
}

async function getFirstGlobalStatistic(req, res) {
    try {
        let body ='';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            const firstGlobalStatistic = await Statistics.getFirstGlobalStatistic();
            console.log(firstGlobalStatistic);
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(firstGlobalStatistic))
        })
    } catch (error){
        console.log(error);
    }
}

module.exports = {
    getUserStatistics,
    getFirstGlobalStatistic
}