<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Medusa
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Documentation</a> |
  <a href="https://www.medusajs.com">Website</a>
</h4>

<p align="center">
  Building blocks for digital commerce
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
    <a href="https://www.producthunt.com/posts/medusa"><img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%20Day-%23DA552E" alt="Product Hunt"></a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

## Quick start

Create a new Postgres database and update the `DATABASE_URL` in the `/backend/.env` file.

Then navigate to the `/backend` folder and run the following command to install the dependencies:

```bash
yarn
```

Run the following command to seed the database:

```bash
yarn seed
```

Then, start the server:

```bash
yarn start
```

The start command will build the admin extension, the admin dashboard, and the start the server.

You can then navigate to the admin dashboard at `http://localhost:9000/app` and login with the following credentials:

Email: `admin@medusa-test.com`
Password: `supersecret`

Next, navigate to the `/storefront` folder.

Run the following command to install the dependencies:

```bash
yarn
```

Then, start the dev server:

```bash
yarn dev
```

## Demo

This demo shows how to create a custom admin widget for Medusa. It is a simple extension that adds a Restock Notification widget to the product detail page. The widget allows the admin to see the number of customers that have signed up for a restock notification for a sold out product variant.

To see the widget in action, navigate to the admin dashboard and click on the "Products" tab in the sidebar. Then click on the "Medusa Coffee Mug" product. You should see the widget at the bottom of the page.

Using the storefront, you can sign up for a restock notification by filling out an email and clicking on the "Subscribe" button. You can then see the number of customers that have signed up for a restock notification in the admin dashboard, after refreshing the product details page.
