import React from 'react';
import express from 'express';
import { renderer } from './helpers/renderer.js';
import { matchRoutes } from "react-router-dom";
import { routes } from './client/routes/routes.js';


const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {

  const matches = matchRoutes(routes, req.path) || [];

  const promises = matches.map(({ route }) => {
    return route.loadData
      ? route.loadData(store).catch(() => null)
      : null;
  });

  Promise.all(promises).then(() => {
    const content = renderer(req);
    res.send(content);
  });
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})