import express from 'express';
import { getCategoriesApi, getCollectionsApi, getProductApi, getProductsApi } from '../api/productsApi.js';
import { getProfile, getUserApi, loginApi, logoutApi, signupApi } from '../api/userApi.js';
import { getToken } from '../helpers/getToken.js';
import { setCookie } from '../helpers/setCookie.js';

const router = express.Router();


router.get('/products', async (req, res) => {
    try {
        const data = await getProductsApi(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/product/:id', async (req, res) => {
    try {
        const data = await getProductApi(req.params.id);
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

router.post('/logout', async (req, res) => {
    try {
        const token = getToken(req);

        if (!token) return res.status(400).json({ error: 'No session token found' });

        res.clearCookie('sb-access-token');
        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Missing email or phone' });

        const data = await loginApi(email, password);

        setCookie(res, data);

        const profile = await getProfile(data.user.id);
        res.json({
            user: profile
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/signup', async (req, res) => {
    try {
        const { email, password, lastName, firstName } = req.body;

        await signupApi(email, password, firstName, lastName);

        const data = await loginApi(email, password);

        setCookie(res, data);
        const profile = await getProfile(data.user.id);

        res.json({
            user: profile
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/user', async (req, res) => {
    try {
        const token = getToken(req);
        if (!token) return res.status(400).json({ error: 'No session token found' });

        const user = await getUserApi(token);
        const profile = await getProfile(user.id);
        res.json({
            user: profile
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



export default router;