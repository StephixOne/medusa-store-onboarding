import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { RestockNotification } from "../models/restock-notification";

const RestockNotificationRepository =
  dataSource.getRepository(RestockNotification);

export default RestockNotificationRepository;
