import { createCustomAdminHooks } from "medusa-react";

const {
  useAdminEntity,
  useAdminEntities,
  useAdminCreateMutation,
  useAdminUpdateMutation,
  useAdminDeleteMutation,
} = createCustomAdminHooks(
  "restock-notifications",
  "admin_restock_notifications"
);

export {
  useAdminEntity,
  useAdminEntities,
  useAdminCreateMutation,
  useAdminUpdateMutation,
  useAdminDeleteMutation,
};
