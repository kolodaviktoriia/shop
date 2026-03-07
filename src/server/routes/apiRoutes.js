import express from 'express';
import { getCategoriesApi, getCollectionsApi, getProductsApi } from '../api/productsApi.js';

const router = express.Router();


router.get('/products', async (req, res) => {
    try {
        const data = await getProductsApi(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/categories', async (req, res) => {
    try {
        const data = await getCategoriesApi();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/collections', async (req, res) => {
    try {
        const data = await getCollectionsApi();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;