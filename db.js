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

const syncAndSeed = async()=> {
  await conn.sync({ force: true});
}

syncAndSeed();
