import 'dotenv/config';
import React from 'react';
import express from 'express';
import { renderer } from './helpers/renderer.js';
import { matchRoutes } from "react-router-dom";
import { routes } from './client/routes/routes.js';
import { createStore } from './helpers/createStore.js';


const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore();
  const matches = matchRoutes(routes, req.path) || [];

  const promises = matches.map(({ route }) => {
    return route.loadData
      ? route.loadData(store).catch(() => null)
      : null;
  });

  Promise.all(promises).then(() => {
    const content = renderer(req, store);
    res.send(content);
  });
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})