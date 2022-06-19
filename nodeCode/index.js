const http = require('http');
const oracledb = require('oracledb');
const {registerUser, loginUser} = require('./controllers/userController')

const PORT = 8081;

const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63343')
    res.setHeader('Access-Control-Request-Method', '')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', '')
    res.setHeader('Access-Control-Max-Age', 2592000) // 30 days
    //let header_custom = res.setHeader('X-Custom-Header', '{ "username": "Delia","password": "pass"}')
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
    }
    else{
        res.writeHead(404,{'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Route not Found'}));
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

