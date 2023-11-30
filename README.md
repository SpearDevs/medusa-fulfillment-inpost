<h1 align="center">
  Medusa Inpost Fulfilment Plugin
</h1>

## Please refrain from using this plugin in a production environment as it is currently in the development phase and may not be stable or fully functional.

# Inpost Fulfillment

Handle order fulfillments using InPost.

[SpearDevs Website](https://speardevs.com)

## Features

- Shipment creation for fulfillments
- Easy cancellation of shipments when needed.
- Accessible information about the selected target point within the order details.
- Fulfillment Shipments Details in Order Overview

---

## Planned Features

- Shipment document generation
- Integration setup in admin panel (Base URL, Organization ID, Token and default template)
- Return shipments

---

## Prerequisites

- [Medusa backend](https://docs.medusajs.com/development/backend/install)
- [InPost Account](https://manager.paczkomaty.pl)

---

## How to Install

1\. Run the following command in the directory of the Medusa backend:

```bash
npm install medusa-fulfillment-inpost
```

2\. Set the following environment variables in `.env`:

  ```bash
  INPOST_BASE_URL=<YOUR_INPOST_BASE_URL>
  INPOST_ORGANIZATION_ID=<YOUR_INPOST_ORGANIZATION_ID>
  INPOST_TOKEN=<YOUR_INPOST_TOKEN>
  INPOST_DEFAULT_TEMPLATE=<YOUR_INPOST_DEFAULT_TEMPLATE>
  ```

3\. In `medusa-config.js` add the following at the end of the `plugins` array:

```js
const plugins = [
  // ...
  {
    resolve: `medusa-fulfillment-inpost`,
    options: {
      enableUI: true,
      base_url: process.env.INPOST_BASE_URL, // required
      token: process.env.INPOST_TOKEN, // required
      organization_id: process.env.INPOST_ORGANIZATION_ID, // required
      default_template: process.env.INPOST_DEFAULT_TEMPLATE, // default: medium, size of the package
    },
  },
]
```

---
## Storefront integration
The data that storefront needs to send to the backend includes address with required phone number and a target point in the shipment data object.
