const express = require('express');
const app = express();

console.log('Starting serverless function');

app.get('/api/test', (req, res) => {
  console.log('Test route accessed');
  res.json({ message: 'Test route is working' });
});

console.log('Importing main app');
const mainApp = require('../backend/server');

console.log('Using main app');
app.use(mainApp);

module.exports = (req, res) => {
  console.log('Serverless function invoked');
  app(req, res);
};