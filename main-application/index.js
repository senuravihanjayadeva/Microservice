const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT | 3003;

app.get('/', (req, res) => {
  res.json({health:"Main Application Service UP"})
})

//Commit Service 
app.get('/commits-service/:username/:repository', (req, res) => {
    axios.get(`http://localhost:3000/api/commits/${req.params.username}/${req.params.repository}`).then((response)=>{
        res.json(response.data);
    }).catch((err)=>{
        res.json(err);
    })
})

//Commits Retrieve from AWS DynamoDB
app.get('/commits-service', (req, res) => {
    axios.get(`http://localhost:3000/api/commits/`).then((response)=>{
        res.json(response.data);
    }).catch((err)=>{
        res.json(err);
    })
})

//Issues Service
app.get('/issues-service/:username/:repository', (req, res) => {
    axios.get(`http://localhost:3002/api/issues/${req.params.username}/${req.params.repository}`).then((response)=>{
        res.json(response.data);
    }).catch((err)=>{
        res.json(err);
    })
})

//Pull Request Service
app.get('/pull-request-service/:username/:repository', (req, res) => {
    axios.get(`http://localhost:3001/api/pulls/${req.params.username}/${req.params.repository}`).then((response)=>{
        res.json(response.data);
    }).catch((err)=>{
        res.json(err);
    })
})

app.listen(port, () => {
  console.log(`Main Application service app listening on port ${port}`)
})