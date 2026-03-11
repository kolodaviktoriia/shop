# 🌸 Blush & Bloom – SSR Cosmetics Shop
This is a **demonstration of a server-side rendered (SSR) e-commerce web application** built with **React**, **Redux**, and **Node.js**. Supports multiple product categories, dynamic routing, and integrates **Supabase** for backend services and **PayPal** for payments.

---

## Features

- **SSR React App** for faster load times and SEO.
- Dynamic **category pages** (skincare, makeup, haircare, wellness, body).
- **Product pages** with detailed information.
- Global **state management** with Redux.
- **Supabase** integration for backend services.
- **PayPal** integration for secure payments.
- Fully **responsive design**.
- Styled with **Sass/SCSS** modules.

---

## Tech Stack

- **Frontend:** React, Redux, SCSS modules, React Router v6
- **Backend:** Node.js, Express.js, SSR
- **Database:** Supabase (PostgreSQL)
- **Payment Gateway:** PayPal
- **Bundler:** Webpack 5
- **ESM Modules:** `import` / `export` syntax

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kolodaviktoriia/shop.git
cd shop
```
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (.env):

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

## Scripts

Start development server (client + server SSR):

```bash
npm run dev
```
