// routes/barangRoutes.js
const express = require('express');
const router = express.Router();
const { Barang } = require('../models');
const { authenticate } = require('../middleware/auth');

// Route to create a new barang
router.post('/', authenticate, async (req, res) => {
    try {
        const { kd_barang, nama_barang, harga_barang, stok_barang } = req.body;
        const barang = await Barang.create({ kd_barang, nama_barang, harga_barang, stok_barang });
        res.status(201).json(barang);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all barangs with pagination
router.get('/', authenticate, async (req, res) => {
    let { page = 1, limit = 10 } = req.query;

    limit = parseInt(limit, 10);

    try {
        const offset = (page - 1) * limit;

        const { count, rows: barangs } = await Barang.findAndCountAll({
            offset,
            limit,
        });

        if (barangs.length === 0) {
            return res.status(404).json({ message: 'Barangs not found' });
        }

        const totalPages = Math.ceil(count / limit);

        const response = {
            totalCount: count,
            totalPages,
            currentPage: page,
            barangs,
        };

        res.json(response);
    } catch (error) {
        console.error('Error fetching barangs:', error);
        res.status(500).json({ message: 'Failed to fetch barangs' });
    }
});

// Route to get a barang by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const barang = await Barang.findByPk(id);
        if (!barang) throw new Error('Barang not found');
        res.json(barang);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update a barang by ID
router.put('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const { kd_barang, nama_barang, harga_barang, stok_barang } = req.body;
        const barang = await Barang.findByPk(id);
        if (!barang) throw new Error('Barang not found');
        barang.kd_barang = kd_barang;
        barang.nama_barang = nama_barang;
        barang.harga_barang = harga_barang;
        barang.stok_barang = stok_barang;
        await barang.save();
        res.json(barang);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a barang by ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const barang = await Barang.findByPk(id);
        if (!barang) throw new Error('Barang not found');
        await barang.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
