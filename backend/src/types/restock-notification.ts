import { RestockNotification } from "../models/restock-notification";

export type CreateRestockNotificationPayload = {
  variant_id: string;
  email: string;
};

export interface QueryParams
  extends Record<string, string | string[] | number> {
  expand?: string;
  select?: string;
  offset?: number;
  limit?: number;
}

export interface StoreListRestockNotificationQuery extends QueryParams {}

export interface AdminListRestockNotificationQuery extends QueryParams {
  product_id?: string;
  emails?: string[];
}

export type ListRestockNotificationRes = {
  restock_notifications: RestockNotification[];
  count: number;
};
