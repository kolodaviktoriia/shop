# 🌸 Blush & Bloom – SSR Cosmetics Shop
This is a **demonstration of a server-side rendered (SSR) e-commerce web application** built with **React**, **Redux**, and **Node.js**. Supports multiple product categories, dynamic routing, and integrates **Supabase** for backend services and **PayPal** for payments.

---

## Features

- **Server-Side Rendered (SSR) React App** – fast initial load and SEO-friendly pages.  
- **Dynamic Category Pages** – skincare, makeup, haircare, wellness, body, with proper routing and SEO.  
- **Product Pages** – detailed information, reviews, add to favourites, and add to cart functionality.  
- **Shopping Cart** – add, remove, and update products, view totals, and integrate with checkout.  
- **User Authentication & Profile Cabinet** – account creation, login, view orders, favourites, and personal data.  
- **Order Processing & Checkout Flow** – stepper-based checkout with PayPal sandbox integration.  
- **Global State Management with Redux Toolkit** – normalized state for products, cart, orders, and user data.  
- **Supabase Backend Integration** – real-time database queries for users, products, and orders.  
- **Fully Responsive Design** – works seamlessly on desktop, tablet, and mobile devices.  
- **Loading States & Error Handling** – spinners, error pages, and “Not Found” pages for smooth UX.  
- **SEO Optimization** – SSR content, meta tags, and proper routing for search engines.  
- **Styled with Sass/SCSS Modules** – modular and maintainable styling.

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
