import { wrapHandler } from "@medusajs/utils";
import { Router } from "express";
import addEmailHandler from "./add-email";

const route = Router();

export default (app: Router): Router => {
  app.use("/store/restock-notifications", route);

  route.post("/", wrapHandler(addEmailHandler));

  return app;
};
