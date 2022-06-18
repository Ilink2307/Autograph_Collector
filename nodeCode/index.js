const http = require('http');
const { registerUser, loginUser } = require('./controllers/userController')
const { getUserStatistics } = require('./controllers/statisticsController')

const PORT = 8081;

const server = http.createServer((req, res) => {

    if(req.url === '/register' && req.method === 'POST') {
        registerUser(req, res);
    } else if(req.url === '/login' && req.method === 'GET') {
        loginUser(req, res);
    } else if(req.url === '/user-statistics' && req.method === 'GET') {
        getUserStatistics(req, res);
    }
    else{
        res.writeHead(404,{'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Route not Found'}));
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

