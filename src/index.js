import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import Landing from './client/pages/Landing.js';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    const content = renderToString(<Landing />);

    const html = `
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8" />
       <title>Shop</title>
     </head>
     <body>
       <div id="root">${content}</div>
       <script src="/bundle.js"></script>
     </body>
   </html>
 `;

    res.send(html);
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})