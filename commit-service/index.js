const express = require('express');
const axios = require('axios');
const { addCommit, getCommits } = require('./dynamodb');
const app = express();
const port = process.env.PORT | 3000;

app.get('/', (req, res) => {
    res.json({health:"Commit Service UP"})
})

app.get('/api/commits', (req, res) => {
  getCommits().then((commits)=>{
    res.json(commits)
  }).catch((error)=>{
    res.json({error: error});
  })
})

app.get('/api/commits/:username/:repository', (req, res) => {
  axios.get(`https://api.github.com/repos/${req.params.username}/${req.params.repository}/commits`).then((response)=>{
    // addCommit(response.data).then(()=>{
    //   res.json(response.data)
    // }).catch((err)=>{
    //   res.json({error:err})
    // })
    res.json(response.data)
  }).catch((e)=>{
    res.json({message:e.message})
  })
})

app.listen(port, () => {
  console.log(`Commit service app listening on port ${port}`)
})