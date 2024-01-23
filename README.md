![Medusa Fulfillment InPost Plugin made by SpearDevs](https://github.com/SpearDevs/medusa-fulfillment-inpost/assets/9082934/40b72874-7e74-4f38-bb5e-a449879ad76f)

## Caution is advised when deploying this plugin in production, as it is in the MVP stage. While stable, ongoing improvements may be in progress.

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
- Selecting Points in Admin Draft Orders (Waiting for [Extending Existing Admin Components](https://github.com/medusajs/medusa/discussions/5954))

---

## Prerequisites

- [Medusa backend](https://docs.medusajs.com/development/backend/install)
- [InPost account](https://manager.paczkomaty.pl)

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
The necessary information that the storefront needs to send to the backend includes the address with the required phone number and a designated target point encapsulated within the shipment data object.

In case you require assistance or guidance during the implementation process in your storefront, do not hesitate to reach out to us. Our team is ready to provide the necessary help to ensure a smooth integration. Feel free to contact us for any queries or assistance you may need during the implementation phase.
