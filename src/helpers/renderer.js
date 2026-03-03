import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { RoutesRender } from '../client/routes/RoutesRender.js';


export const renderer = (req) => {
  const content = renderToString(
    <StaticRouter location={req.path}>
      <RoutesRender />
    </StaticRouter>);

  const html = `
     <!DOCTYPE html>
     <html>
       <head>
         <meta charset="utf-8" />
         <title>Shop</title>
         <link rel="stylesheet" href="/main.css" />
       </head>
       <body>
         <div id="root">${content}</div>
         <script src="/bundle.js"></script>
       </body>
     </html>
   `;
  return html;
}