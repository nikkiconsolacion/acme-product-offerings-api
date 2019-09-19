const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_product_offerings_db');
const { STRING, UUID, UUIDV4, DECIMAL } = Sequelize;

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true
  },
  suggestedPrice: {
    type: DECIMAL
  }
});

const Company = conn.define('company', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true
  }
});

const Offering = conn.define('offering', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  price: {
    type: DECIMAL
  }
});

Offering.belongsTo(Product);
Product.hasMany(Offering, { foreignKey: 'productId' });
Offering.belongsTo(Company);
Company.hasMany(Offering, { foreignKey: 'companyId' });

const syncAndSeed = async()=> {
  await conn.sync({ force: true});
  const products = [
    { name: 'water', suggestedPrice: 1.5 },
    { name: 'soda', suggestedPrice: 2.2 }
  ];
  const [water, soda] = await Promise.all(products.map( product => Product.create(product)));
  const companies = [
    { name: 'Fiji'},
    { name: 'Coca-Cola'}
  ];
  const [ Fiji, CocaCola] = await Promise.all(companies.map( company => Company.create(company)));
  const offerings = [
    { price: 1.1, companyId: Fiji.id, productId: water.id },
    { price: 2.4, companyId: CocaCola.id, productId: soda.id }
  ];
  await Promise.all(offerings.map( offering => Offering.create(offering)));
}

module.exports = {
  syncAndSeed,
  models: {
    Product,
    Company,
    Offering
  }
}
