const express = require('express');
const Datastore = require('nedb')
require('dotenv').config();
const { response, request } = require('express');
const app = express();
const port = process.env.PORT || 8000;
app.listen(port ,() => console.log(`listening ${port}..`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const dataBase = new Datastore('database.db');
dataBase.loadDatabase(); 

const coords = [];

app.get('/api',(request,response) =>{
    dataBase.find({},(err,data) =>{
        response.json(data);
        if (err) response.end(); return;
    })
})

app.post('/api', async (request, response) => {
    const data = request.body;
    coords.push(data);
    dataBase.insert(data);
    response.json(data);
});