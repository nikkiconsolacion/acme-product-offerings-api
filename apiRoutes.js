const router = require('express').Router();
const { models } = require('./db');
const { Product, Company, Offering } = models;

router.get('/products', (req, res, next)=> {
  Product.findAll()
    .then( products => res.send(products))
    .catch(next)
});
router.get('/companies', (req, res, next)=> {
  Company.findAll()
    .then( companies => res.send(companies))
    .catch(next)
});
router.get('/offerings', (req, res, next)=> {
  Offering.findAll()
    .then( offerings => res.send(offerings))
    .catch(next)
});

module.exports = router;

