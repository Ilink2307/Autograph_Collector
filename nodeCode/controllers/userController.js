const Person = require('../models/userModel')

async function registerUser(req, res){
    try {
        let body ='';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
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

    } catch (error){
        console.log(error);
    }
}
// async function loginUser(req, res){
//     try {
//         const person = {
//             id_user: 10,
//             email: 'email@email',
//             username: 'username',
//             password: 'password'
//         }
//         const newUser = Person.registerUserBD(person);
//         res.writeHead(201, {'Content-Type': 'application/json'});
//         return res.end(JSON.stringify(newUser))
//
//     }catch (error){
//         console.log(error);
//     }
// }



module.exports = {
    registerUser,
    //loginUser
}