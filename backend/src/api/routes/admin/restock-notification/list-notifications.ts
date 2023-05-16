import { Request, Response } from "express";
import { RestockNotification } from "../../../../models/restock-notification";
import RestockNotificationService from "../../../../services/restock-notification";
import { AdminListRestockNotificationQuery } from "../../../../types";

export default async function listNotificationsHandler(
  req: Request,
  res: Response
) {
  const restockNotificationService: RestockNotificationService =
    req.scope.resolve("restockNotificationService");

  const { offset, limit, expand, select, emails, product_id } =
    req.query as AdminListRestockNotificationQuery;

  const [restock_notifications, count] =
    await restockNotificationService.listAndCount(
      {
        emails: emails,
        product_id: product_id,
      },
      {
        relations: expand ? expand.split(",") : undefined,
        select: select
          ? (select.split(",") as unknown as (keyof RestockNotification)[])
          : undefined,
        take: limit ? Number(limit) : 20,
        skip: offset ? Number(offset) : 0,
      }
    );

  res.status(200).json({ restock_notifications, count });
}
