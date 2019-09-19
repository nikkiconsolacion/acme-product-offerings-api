const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, models } = require('./db');
const { Product, Company, Offering } = models;
const port = process.env.PORT || 3000;

app.use('/api', require('./apiRoutes'));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});


syncAndSeed()
  .then(()=> {
    app.listen(port, ()=> console.log(`Listening on port ${port}`))
  });
