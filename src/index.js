import 'dotenv/config';
import React from 'react';
import express from 'express';
import { renderer } from './helpers/renderer.js';
import { matchRoutes } from 'react-router-dom';
import { routes } from './client/routes/routes.js';
import { createStore } from './helpers/createStore.js';
import apiRoutes from './server/routes/apiRoutes.js';
import cookieParser from 'cookie-parser';
import {
  clearServerCookies,
  setServerCookies,
} from './client/api/axiosConfig.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes);

app.get('*', async (req, res) => {
  const store = createStore();

  setServerCookies(req.headers.cookie || '');

  const matches = matchRoutes(routes, req.path) || [];

  for (const { route, params } of matches) {
    if (route.loadData) {
      try {
        await route.loadData(store, params);
      } catch (err) {
        console.error('SSR loadData error:', err);
      }
    }
  }

  const content = renderer(req, store);
  res.send(content);

  clearServerCookies();
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
