import bodyParser from "body-parser";
import cors from "cors";
import { Router } from "express";
import restockNotificationRoutes from "./restock-notification";

const storeRouter = Router();

export function getStoreRouter(storeCorsOptions): Router {
  storeRouter.use(cors(storeCorsOptions), bodyParser.json());

  restockNotificationRoutes(storeRouter);

  return storeRouter;
}
