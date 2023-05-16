import { Request, Response } from "express";
import RestockNotificationService from "../../../../services/restock-notification";

export default async function addEmailHandler(req: Request, res: Response) {
  const { email, variant_id } = req.body;

  if (!email || !variant_id) {
    res.status(400).json({
      message: "Missing email or variant_id",
    });
    return;
  }

  const restockSubscriptionService: RestockNotificationService =
    req.scope.resolve("restockNotificationService");

  const notification = await restockSubscriptionService.addEmail({
    email,
    variant_id,
  });

  res.status(200).json({ restock_notification: notification });
}
