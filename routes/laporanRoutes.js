const express = require('express');
const router = express.Router();
const { Laporan } = require('../models');
const { authenticate } = require('../middleware/auth');

// Route to create a new laporan
router.post('/', authenticate, async (req, res) => {
    try {
        const { id_barang, jenis, tanggal, data_laporan } = req.body;
        const laporan = await Laporan.create({ id_barang, jenis, tanggal, data_laporan });
        res.status(201).json(laporan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all laporans with pagination
router.get('/', authenticate, async (req, res) => {
    let { page = 1, limit = 10 } = req.query;

    limit = parseInt(limit, 10);

    try {
        const offset = (page - 1) * limit;

        const { count, rows: laporans } = await Laporan.findAndCountAll({
            offset,
            limit,
        });

        if (laporans.length === 0) {
            return res.status(404).json({ message: 'Laporans not found' });
        }

        const totalPages = Math.ceil(count / limit);

        const response = {
            totalCount: count,
            totalPages,
            currentPage: page,
            laporans,
        };

        res.json(response);
    } catch (error) {
        console.error('Error fetching laporans:', error);
        res.status(500).json({ message: 'Failed to fetch laporans' });
    }
});

// Route to get a laporan by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const laporan = await Laporan.findByPk(id);
        if (!laporan) throw new Error('Laporan not found');
        res.json(laporan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update a laporan by ID
router.put('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const { id_barang, jenis, tanggal, data_laporan } = req.body;
        const laporan = await Laporan.findByPk(id);
        if (!laporan) throw new Error('Laporan not found');
        laporan.id_barang = id_barang;
        laporan.jenis = jenis;
        laporan.tanggal = tanggal;
        laporan.data_laporan = data_laporan;
        await laporan.save();
        res.json(laporan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a laporan by ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const laporan = await Laporan.findByPk(id);
        if (!laporan) throw new Error('Laporan not found');
        await laporan.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
