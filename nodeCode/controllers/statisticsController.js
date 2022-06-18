const Statistics = require('../models/statisticsModel')

async function getUserStatistics(req, res) {
    try {

        let body ='';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            const  userStatistics = await Statistics.getLoggedUserStatistics();
            res.writeHead(201, {'Content-Type': 'application/json'});
            console.log(userStatistics)
            return res.end(JSON.stringify(userStatistics))
        })
    } catch (error){
        console.log(error);
    }
}

module.exports = {
    getUserStatistics
}