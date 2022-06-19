const Person = require('../models/userModel')

// @desc Register User
// @route POST /register
async function registerUser(req, res){
    try {
        let body ='';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            console.log("Register Body")
            console.log(body);
            const {email, username, password} = JSON.parse(body);

            const person = {
                email,
                username,
                password
            }

            const newUser = Person.registerUserBD(person);
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(newUser))

        })


    }catch (error){
        console.log(error);
    }
}

// @desc Login User
// @route GET /login
async function loginUser(req, res, header_custom){
    try {

        let person;
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            console.log("BOdy: ")
            console.log(body);
            const {username, password} = JSON.parse(body);

            person = {
                username,
                password,
            }

            const personExists = await Person.findIfUserExistsByUsername(person.username, person.password);

            if(!personExists){
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'User Not Registered'}))
                console.log ("User Not Registered")
            }
            else{
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'User Logged in'}))
                console.log ("User Logged in")
            }
        })


    }catch (error){
        console.log(error);
    }
}



module.exports = {
    registerUser,
    loginUser
}