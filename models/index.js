const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize('uas_dpsi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
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
