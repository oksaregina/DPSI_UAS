// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');


dotenv.config();

// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize('uas_dpsi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = require('./user')(sequelize);
const Barang = require('./barang')(sequelize);
const Laporan = require('./laporan')(sequelize);

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Unable to sync database:', error);
    });

module.exports = { sequelize, User, Barang, Laporan };
