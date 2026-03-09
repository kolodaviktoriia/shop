import express from 'express';
import { getCategoriesApi, getCollectionsApi, getProductApi, getProductsApi } from '../api/productsApi.js';
import { getProfile, getUserApi, loginApi, logoutApi, signupApi } from '../api/userApi.js';
import { getToken } from '../helpers/getToken.js';
import { setCookie } from '../helpers/setCookie.js';
import { getCartApi, saveCartApi } from '../api/cartApi.js';

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

        const token = await getToken(req, res);
        if (!token) return res.status(400).json({ error: 'No session token found' });

        res.clearCookie('sb-access-token', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
        res.clearCookie('sb-refresh-token', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });

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
        const token = await getToken(req, res);
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

router.get('/cart', async (req, res) => {
    try {
        const token = await getToken(req, res);
        if (!token) return res.status(400).json({ error: 'No session token found' });

        const user = await getUserApi(token);

        const items = await getCartApi(user.id);
        res.json({
            items
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/cart', async (req, res) => {
    try {

        const token = await getToken(req, res);
        if (!token) return res.status(400).json({ error: 'No session token found' });

        const user = await getUserApi(token);
        const items = await saveCartApi(user.id, req.body.items);
        res.json({
            items
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



export default router;