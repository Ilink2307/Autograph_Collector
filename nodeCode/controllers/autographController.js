const AutographModel = require('../models/autographModel');

async function getAutographs(req, res) {
    try {
        let body ='';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {

            let userID = 4; // va fi luat din header de la get dupa ce face autentificarea

            const getResponse = await AutographModel.getAutographs(userID);
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(getResponse))
        })
    } catch (error){
        console.log(error);
    }
}

async function addNewAutograph(req, res) {
    try {
        let body ='';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            const {
                idUser,
                photo,
                autographDate,
                author,
                autographItem,
                tags,
                mentions,
                moment
            } = JSON.parse(body);

            const autograph = {
                idUser,
                photo,
                autographDate,
                author,
                autographItem,
                tags,
                mentions,
                moment
            }

            const addResponse = await AutographModel.addAutograph(autograph);
            console.log(addResponse)
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(addResponse))
        })
    } catch (error){
        console.log(error);
    }
}

module.exports = {
    addNewAutograph,
    getAutographs
}