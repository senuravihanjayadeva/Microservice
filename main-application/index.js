const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT | 3003;

app.get('/', (req, res) => {
  res.json({health:"Main Application Service UP"})
})

const commitservice = `http://commit-app-service:80`
const issueservice = `http://issues-service:80`
const pullrequestservice = `http://pull-request-service:80`

//Commit Service 
app.get('/commits-service/:username/:repository', (req, res) => {
    axios.get(`${issueservice}/api/issues/${req.params.username}/${req.params.repository}`).then((response)=>{
        res.json(response.data);
    }).catch((err)=>{
        res.json(err);
    })
})

//Commits Retrieve from AWS DynamoDB
app.get('/commits-service', (req, res) => {
    axios.get(`${commitservice}/api/commits/`).then((response)=>{
        res.json(response.data);
    }).catch((err)=>{
        res.json(err);
    })
})

//Issues Service
app.get('/issues-service/:username/:repository', (req, res) => {
    axios.get(`${issueservice}/api/issues/${req.params.username}/${req.params.repository}`).then((response)=>{
        res.json(response.data);
    }).catch((err)=>{
        res.json(err);
    })
})

//Pull Request Service
app.get('/pull-request-service/:username/:repository', (req, res) => {
    axios.get(`${pullrequestservice}/api/pulls/${req.params.username}/${req.params.repository}`).then((response)=>{
        res.json(response.data);
    }).catch((err)=>{
        res.json(err);
    })
})

app.listen(port, () => {
  console.log(`Main Application service app listening on port ${port}`)
})