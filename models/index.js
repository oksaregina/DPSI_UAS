const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectModule: require('mysql2')
  });

const User = require('./user')(sequelize);
const Barang = require('./barang')(sequelize);
const Laporan = require('./laporan')(sequelize);

// Define associations
Barang.hasMany(Laporan, { foreignKey: 'id_barang', as: 'laporan' });
Laporan.belongsTo(Barang, { foreignKey: 'id_barang', as: 'barang' });

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Unable to sync database:', error);
    });

module.exports = { sequelize, User, Barang, Laporan };
