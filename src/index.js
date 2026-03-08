import 'dotenv/config';
import React from 'react';
import express from 'express';
import { renderer } from './helpers/renderer.js';
import { matchRoutes } from "react-router-dom";
import { routes } from './client/routes/routes.js';
import { createStore } from './helpers/createStore.js';
import apiRoutes from './server/routes/apiRoutes.js';
import cookieParser from 'cookie-parser';
import { clearServerCookies, setServerCookies } from './client/api/axiosConfig.js';

const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  const store = createStore();

  setServerCookies(req.headers.cookie || "");

  const matches = matchRoutes(routes, req.path) || [];

  const promises = matches.map(({ route, params }) => {
    return route.loadData
      ? route.loadData(store, params).catch(() => null)
      : null;
  });

  Promise.all(promises)
    .then(() => {
      const content = renderer(req, store);
      res.send(content);
    })
    .finally(() => {
      clearServerCookies();
    });

})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})