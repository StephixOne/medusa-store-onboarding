import bodyParser from "body-parser";
import cors from "cors";
import { Router } from "express";
import restockNotificationRoutes from "./restock-notification";

const adminRouter = Router();

export function getAdminRouter(adminCorsOptions): Router {
  adminRouter.use(cors(adminCorsOptions), bodyParser.json());

  restockNotificationRoutes(adminRouter, adminCorsOptions);

  return adminRouter;
}
