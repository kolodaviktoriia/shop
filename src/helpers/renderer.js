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
          <title>BLUSH & BLOSSOM</title>
          <link rel="stylesheet" href="/main.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify/dist/ReactToastify.min.css" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
          <link rel="manifest" href="/site.webmanifest">
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.INITIAL_STATE = ${serializeJavascript(store.getState())}
          </script>
          <script src="/bundle.js"></script>
          <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
          <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </body>
      </html>
      `;
  return html;
}