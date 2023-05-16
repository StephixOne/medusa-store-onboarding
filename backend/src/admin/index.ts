import { extend } from "@medusajs/admin-sdk";
import { ProductRestockWidget } from "./product-restock-widget";

export default extend({
  identifier: "medusa-restock-notification",
  widgets: {
    product: {
      details: [
        {
          Component: ProductRestockWidget,
          name: "product-restock-widget",
        },
      ],
    },
  },
});
