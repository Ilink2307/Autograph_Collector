const http = require('http');
const { registerUser, loginUser } = require('./controllers/userController')
const { getUserStatistics, getFirstGlobalStatistic } = require('./controllers/statisticsController')
const { addNewAutograph, getAutographs } = require('./controllers/autographController')

const PORT = 8081;

const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63343')
    res.setHeader('Access-Control-Request-Method', '')

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', '')
    res.setHeader('Access-Control-Max-Age', 2592000) // 30 days
    if (req.method === 'OPTIONS') {
        console.log("OPTIONS :)")
        res.writeHead(200)
        res.end()
        //return
    }else if(req.url === '/register' && req.method === 'POST'){
        registerUser(req, res).then(
            function(value) { console.log("register success") },
            function(error) { console.log("register fail") }
        );
    }else if(req.url === '/login' && req.method === 'POST'){
        loginUser(req, res).then(
            function(value) { console.log("login success") },
            function(error) { console.log("login fail") }
        );
    } else if(req.url === '/user-statistics' && req.method === 'GET') {
        getUserStatistics(req, res).then(
            function(value) { console.log("personal statistics success") },
            function(error) { console.log("personal statistics fail") }
        );
    } else if(req.url === '/global-statistic-1' && req.method === 'GET') {
        getFirstGlobalStatistic(req, res).then(
            function(value) { console.log("first global statistic success") },
            function(error) { console.log("first global statistic fail") }
        ); //nu merge
    } else if(req.url === '/global-statistic-2' && req.method === 'GET') {
        getSecondGlobalStatistic(req, res); //de implementat
    } else if(req.url === '/global-statistic-3' && req.method === 'GET') {
        getThirdGlobalStatistic(req, res); //de implementat
    } else if(req.url === '/new-autograph' && req.method === 'POST') {
        addNewAutograph(req, res).then(
            function(value) { console.log("add success") },
            function(error) { console.log("add fail") }
        );
    } else if(req.url === '/main-get' && req.method === 'GET') {
        console.log("se va efectua get autographs");
        getAutographs(req, res).then(
            function(value) { console.log("main get success") },
            function(error) { console.log("main get fail") }
        );
    }
    else{
        res.writeHead(404,{'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Route not Found'}));
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

