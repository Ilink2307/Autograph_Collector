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

            if(isRegisterInputValid(email, username, password)){
                const newUser = Person.registerUserBD(person);
                res.writeHead(201, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify(newUser))
            }
            else{
                console.log("nu ii place inputul la register");
            }

        })

    }catch (error){
        console.log(error);
    }
}

// @desc Login User
// @route POST /login
async function loginUser(req, res){
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

            if(isLoginInputValid(username, password)){
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
            }
            else{console.log("nu ii place inputul la login")}

        })


    }catch (error){
        console.log(error);
    }
}

function isLoginInputValid (username, password){

    if(username.length < 3 || username.length > 30 || password.length < 3)
        return false

    if (/^[0-9@._a-zA-Z]+$/.test(password)){
        return true;
    }
    else{
        return false;
    }

}

function isRegisterInputValid (email, username, password){

    if(username.length < 3 || username.length > 30 || password.length < 3)
        return false
           // /^[a-zA-Z]+[@][0-9@._a-zA-Z]+[.com]$/
    if (/^[0-9@._a-zA-Z]+$/.test(email) && /^[0-9@._a-zA-Z]+$/.test(password)){
        return true;
    }
    else{
        return false;
    }

}



module.exports = {
    registerUser,
    loginUser
}