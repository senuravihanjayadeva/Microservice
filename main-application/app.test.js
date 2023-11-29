const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();

app.get('/', function(req, res) {
  res.status(200).json({ name: 'john' });
});

request(app)
  .get('/')
  .expect(200)