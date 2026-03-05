import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { RoutesRender } from '../client/routes/RoutesRender.js';
import serializeJavascript from 'serialize-javascript';
import { Provider } from 'react-redux';


export const renderer = (req, store) => {
  const content = renderToString(
    <Provider store={store} >
      <StaticRouter location={req.path}>
        <RoutesRender />
      </StaticRouter>
    </Provider>);

  const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Shop</title>
          <link rel="stylesheet" href="/main.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.INITIAL_STATE = ${serializeJavascript(store.getState())}
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>
      `;
  return html;
}