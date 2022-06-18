const express = require('express');
const app = express();
const port = 8081;
const oracledb = require('oracledb');


app.get('/', (req, res) => {
    //get requests to the root ("/") will route here
    res.sendFile('welcomeScreen.html', {root: __dirname});
    //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});


var fs = require("fs");

var todos = [{id:1, title:'buy the milk'}, {id:2, title:'rent a car'}, {id:3, title:'feed the cat'}];
app.get('/', (request, response) => response.status(200).json(todos));

app.get('/:id', function (req, res) {
    //First read existing users.
    // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //     var users = JSON.parse( data );
    //     var user = users["user" + req.params.id]
    //     console.log( user );
    //     res.end( JSON.stringify(user));
    // }
    // );
    run();
    console.log("ceva");
    res.append("ceva", "2");
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

async function run() {
    let connection;
    try {
        connection = await oracledb.getConnection({user:"project", password:"PROJECT", connectionString:"localhost/XE"});
        console.log("Success");
        await connection.close;
    }
    catch (error){
        console.error(error);
    }

}
