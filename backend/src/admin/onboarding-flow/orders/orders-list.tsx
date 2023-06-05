import React from "react";
import Button from "../../shared/button";
import { useAdminProducts } from "medusa-react";
import { useAdminCreateDraftOrder } from "medusa-react";
import { useAdminShippingOptions } from "medusa-react";
import { useAdminRegions } from "medusa-react";
import { useMedusa } from "medusa-react";

const OrdersList = ({ onNext }) => {
  const { products } = useAdminProducts();
  const { mutate: createDraftOrder } = useAdminCreateDraftOrder();
  const { client } = useMedusa();

  const { regions } = useAdminRegions();
  const { shipping_options } = useAdminShippingOptions();

  const createOrder = () => {
    // TODO: Maybe use a specific product instead of taking first one?
    // Issues could arise if first one doesn't have variant etc
    const product = products[0];
    const variant = product.variants[0] ?? null;

    createDraftOrder(
      {
        email: "customer@medusajs.com",
        items: [
          variant
            ? {
                quantity: 1,
                variant_id: variant.id,
              }
            : {
                quantity: 1,
                title: product.title,
                unit_price: 50,
              },
        ],
        shipping_methods: [
          {
            option_id: shipping_options[0].id,
          },
        ],
        region_id: regions[0].id,
      },
      {
        onSuccess: async ({ draft_order }) => {
          const { order } = await client.admin.draftOrders.markPaid(
            draft_order.id
          );
          onNext(order);
        },
      }
    );
  };
  return (
    <>
      <div className="py-4">
        <p>You can now create an order.</p>
        <p>
          To create an order, you can choose to create a sample order, use
          Swagger UI to simulate the necessary API requests to create an order,
          or use Medusa's Next.js Storefront Starter.
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="small" onClick={() => createOrder()}>
          Create a sample order
        </Button>
        <a href="#">
          <Button variant="secondary" size="small">
            Install Next.js Starter Storefront
          </Button>
        </a>
      </div>
    </>
  );
};

export default OrdersList;
