const OptionsModel = require('../models/optionsModel')

async function getItems(req, res) {
    try {
        let body ='';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            const items = await OptionsModel.getItems();
            console.log(items)
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(items))
        })
    } catch (error){
        console.log(error);
    }
}

async function getPersonalities(req, res) {
    try {
        let body ='';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            const personalities = await OptionsModel.getPersonalities();
            console.log(personalities)
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(personalities))
        })
    } catch (error){
        console.log(error);
    }
}

async function getTags(req, res) {
    try {
        let body ='';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            const tags = await OptionsModel.getTags();
            console.log(tags)
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(tags))
        })
    } catch (error){
        console.log(error);
    }
}

module.exports = {
    getItems,
    getPersonalities,
    getTags
}