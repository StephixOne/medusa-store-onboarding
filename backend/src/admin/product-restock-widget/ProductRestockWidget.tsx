import { ProductWidgetProps } from "@medusajs/admin-sdk";
import React from "react";
import {
  AdminListRestockNotificationQuery,
  ListRestockNotificationRes,
} from "../../types";
import { Container } from "../shared/container";
import { useAdminEntities } from "../shared/hooks";
import Table from "../shared/table";

const ProductRestockWidget = (props: ProductWidgetProps) => {
  const { data } = useAdminEntities<
    AdminListRestockNotificationQuery,
    ListRestockNotificationRes
  >({
    product_id: props.product.id,
    expand: "variant,variant.product",
  });

  return (
    <Container title="Restock Notifications">
      {data?.restock_notifications ? (
        <Table restockNotification={data?.restock_notifications} />
      ) : (
        <div className="flex flex-1 items-center justify-center py-6">
          <p className="text-gray-500 text-sm">
            No restock notifications for this product
          </p>
        </div>
      )}
    </Container>
  );
};

export default ProductRestockWidget;
