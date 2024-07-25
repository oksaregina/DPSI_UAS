const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Laporan = sequelize.define('Laporan', {
        id_laporan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_barang: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Barang',
                key: 'id_barang',
            },
            allowNull: false,
        },
        jenis: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tanggal: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        data_laporan: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
    });

    Laporan.associate = (models) => {
        Laporan.belongsTo(models.Barang, {
            foreignKey: 'id_barang',
            as: 'barang'
        });
    };

    return Laporan;
};
