import express from 'express';
import {
  getCategoriesApi,
  getCollectionsApi,
  getProductApi,
  getProductsApi,
  getFavoritesApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from '../supabaseApi/productsApi.js';
import {
  getProfile,
  getUserApi,
  loginApi,
  signupApi,
  updateShippingAddress,
} from '../supabaseApi/userApi.js';
import { getToken } from '../helpers/getToken.js';
import { setCookie } from '../helpers/setCookie.js';
import { getCartApi, saveCartApi } from '../supabaseApi/cartApi.js';
import {
  captureOrderApi,
  createOrderApi,
  getOrderApi,
  getOrdersApi,
} from '../supabaseApi/ordersApi.js';
import {
  client,
  OrdersCaptureRequest,
  OrdersCreateRequest,
} from '../paypal.js';

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const data = await getProductsApi(req.query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Failed to load products. Please try again later.' });
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const data = await getProductApi(req.params.id);

    if (!data) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load product.' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const data = await getCategoriesApi();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load categories.' });
  }
});

router.get('/collections', async (req, res) => {
  try {
    const data = await getCollectionsApi();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load collections.' });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const token = await getToken(req, res);

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in.' });
    }

    res.clearCookie('sb-access-token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    res.clearCookie('sb-refresh-token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({ message: 'Logged out successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Logout failed. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }

    const data = await loginApi(email, password);

    if (!data?.user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    setCookie(res, data);

    const profile = await getProfile(data.user.id);

    res.json({ user: profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Login failed. Please check your credentials and try again.',
    });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password, lastName, firstName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    await signupApi(email, password, firstName, lastName);

    const data = await loginApi(email, password);

    setCookie(res, data);

    const profile = await getProfile(data.user.id);

    res.json({ user: profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

router.get('/user', async (req, res) => {
  try {
    const token = await getToken(req, res);

    if (!token) {
      return res.status(401).json({ message: 'You are not authenticated.' });
    }

    const user = await getUserApi(token);
    const profile = await getProfile(user.id);

    res.json({ user: profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load user profile.' });
  }
});

router.get('/cart', async (req, res) => {
  try {
    const token = await getToken(req, res);

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Please log in to view your cart.' });
    }

    const user = await getUserApi(token);

    const items = await getCartApi(user.id);

    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load cart.' });
  }
});

router.post('/cart', async (req, res) => {
  try {
    const token = await getToken(req, res);

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Please log in to update your cart.' });
    }

    const user = await getUserApi(token);

    const items = await saveCartApi(user.id, req.body.items);

    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save cart.' });
  }
});

router.post('/orders', async (req, res) => {
  const request = new OrdersCreateRequest();

  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: (req.body.order.totalPrice / 100).toFixed(2),
        },
      },
    ],
  });

  try {
    const token = await getToken(req, res);

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Please log in to place an order.' });
    }

    const user = await getUserApi(token);

    const order = await client.execute(request);

    const orderId = await createOrderApi(
      user.id,
      req.body.order,
      order.result.id,
      order.result
    );

    res.json({ id: order.result.id, orderId });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Failed to create order. Please try again.' });
  }
});

router.post('/orders/:orderID/capture', async (req, res) => {
  const orderID = req.params.orderID;

  const request = new OrdersCaptureRequest(orderID);

  try {
    const capture = await client.execute(request);

    const orderId = await captureOrderApi(
      orderID,
      capture,
      capture.result.status
    );

    res.json({
      id: capture.result.id,
      status: capture.result.status,
      orderId,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Payment capture failed. Please contact support.' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const token = await getToken(req, res);

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Please log in to view your orders.' });
    }

    const user = await getUserApi(token);

    const orders = await getOrdersApi(user.id, req.query);

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load orders.' });
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const token = await getToken(req, res);

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Please log in to view the order.' });
    }

    const user = await getUserApi(token);

    const order = await getOrderApi(user.id, req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load order.' });
  }
});

router.get('/favorites', async (req, res) => {
  try {
    const token = await getToken(req, res);

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Please log in to view your favorites.' });
    }

    const user = await getUserApi(token);

    const favorites = await getFavoritesApi(user.id);

    res.json({ favorites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load favorites.' });
  }
});

router.post('/favorites', async (req, res) => {
  try {
    const token = await getToken(req, res);

    if (!token) {
      return res.status(401).json({ message: 'Please log in to delete.' });
    }
    const user = await getUserApi(token);
    const { id } = req.body;

    await addFavoriteApi(user.id, id);

    res.json({ message: 'Deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add favorite.' });
  }
});

router.delete('/favorites/:id', async (req, res) => {
  try {
    const token = await getToken(req, res);

    if (!token) {
      return res.status(401).json({ message: 'Please log in to delete.' });
    }

    await deleteFavoriteApi(req.params.id);

    res.json({ message: 'Deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete favorite.' });
  }
});
export default router;


router.post('/address', async (req, res) => {
  try {
    const token = await getToken(req, res);

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Please log in to update your address.' });
    }

    const user = await getUserApi(token);

    await updateShippingAddress(req.body, user.id);
    const profile = await getProfile(user.id);

    res.json({ user: profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update address.' });
  }
});

