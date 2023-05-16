import authenticate from "@medusajs/medusa/dist/api/middlewares/authenticate";
import { wrapHandler } from "@medusajs/utils";
import cors from "cors";
import { Router } from "express";
import listNotificationsHandler from "./list-notifications";

const route = Router();

export default (app: Router, corsOptions): Router => {
  app.use("/admin/restock-notifications", route);

  route.options("/", cors(corsOptions));
  route.get(
    "/",
    cors(corsOptions),
    authenticate(),
    wrapHandler(listNotificationsHandler)
  );

  return app;
};
