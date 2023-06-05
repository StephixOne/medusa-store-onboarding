import bodyParser from "body-parser";
import cors from "cors";
import { Router } from "express";

const storeRouter = Router();

export function getStoreRouter(storeCorsOptions): Router {
  storeRouter.use(cors(storeCorsOptions), bodyParser.json());

  return storeRouter;
}
