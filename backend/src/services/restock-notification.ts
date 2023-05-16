import {
  CustomerService,
  FindConfig,
  ProductService,
  ProductVariantService,
  Selector,
  TransactionBaseService,
} from "@medusajs/medusa";
import { MedusaError, MedusaErrorTypes, buildQuery } from "@medusajs/utils";
import { RestockNotification } from "../models/restock-notification";
import RestockNotificationRepository from "../repositories/restock-notification";
import { CreateRestockNotificationPayload } from "../types";

type InjectedDependencies = {
  productVariantService: ProductVariantService;
  productService: ProductService;
  customerService: CustomerService;
  restockNotificationRepository: typeof RestockNotificationRepository;
};

class RestockNotificationService extends TransactionBaseService {
  protected productVariantService_: ProductVariantService;
  protected productService_: ProductService;
  protected customerService_: CustomerService;
  protected restockNotificationRepository_: typeof RestockNotificationRepository;

  constructor({
    customerService,
    productService,
    productVariantService,
    restockNotificationRepository,
  }: InjectedDependencies) {
    super(arguments[0]);

    this.productVariantService_ = productVariantService;
    this.productService_ = productService;
    this.customerService_ = customerService;
    this.restockNotificationRepository_ = restockNotificationRepository;
  }

  async retrieve(variantId: string): Promise<RestockNotification | undefined> {
    const restockRepo = this.activeManager_.withRepository(
      this.restockNotificationRepository_
    );
    return await restockRepo.findOne({ where: { variant_id: variantId } });
  }

  async listAndCount(
    selector: Selector<RestockNotification> & { product_id?: string },
    config: FindConfig<RestockNotification> = {
      relations: [],
      skip: 0,
      take: 20,
      order: { created_at: "DESC" },
    }
  ): Promise<[RestockNotification[], number]> {
    const restockRepo = this.activeManager_.withRepository(
      this.restockNotificationRepository_
    );

    if (selector.product_id) {
      const product = await this.productService_.retrieve(selector.product_id, {
        relations: ["variants"],
      });

      delete selector.product_id;

      const variantIds = product.variants.map((v) => v.id);

      selector.variant_id = variantIds;
    }

    const query = buildQuery<
      Selector<RestockNotification>,
      RestockNotification
    >(selector, config);

    return await restockRepo.findAndCount(query);
  }

  async addEmail(data: CreateRestockNotificationPayload) {
    return await this.atomicPhase_(async (manager) => {
      const restockNotificationRepo = manager.withRepository(
        this.restockNotificationRepository_
      );

      const { variant_id, email } = data;

      const variant = await this.productVariantService_.retrieve(variant_id, {
        select: ["id", "inventory_quantity"],
      });

      let restockNotification = await this.retrieve(variant.id);

      if (restockNotification) {
        const emailAlreadySubscribed =
          restockNotification.emails.includes(email);

        if (emailAlreadySubscribed) {
          throw new MedusaError(
            MedusaErrorTypes.NOT_ALLOWED,
            `Email ${email} is already subscribed to restock notifications for variant ${variant.id}`
          );
        }

        if (variant.inventory_quantity > 0) {
          throw new MedusaError(
            MedusaError.Types.NOT_ALLOWED,
            "You cannot sign up for restock notifications on a product that is not sold out"
          );
        }

        restockNotification.emails.push(email);
      } else {
        restockNotification = restockNotificationRepo.create({
          variant_id: variant.id,
          emails: [email],
        });
      }

      const result = await restockNotificationRepo.save(restockNotification);

      return result;
    });
  }

  async delete(id: string) {
    const restockRepo = this.activeManager_.withRepository(
      this.restockNotificationRepository_
    );

    const subscription = await restockRepo.findOne({
      where: { id },
    });

    if (!subscription) {
      return;
    }

    await restockRepo.softRemove(subscription);
  }
}

export default RestockNotificationService;
