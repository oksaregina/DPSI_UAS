const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Barang = sequelize.define('Barang', {
        id_barang: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        kd_barang: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nama_barang: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        harga_barang: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stok_barang: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: 'Barang',
    });

    Barang.associate = (models) => {
        Barang.hasMany(models.LaporanBarang, {
            foreignKey: 'id_barang',
            foreignKey: 'id_barang',
        });
    };

    return Barang;
};
