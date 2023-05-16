import { ProductVariant } from "@medusajs/medusa";
import { SoftDeletableEntity, generateEntityId } from "@medusajs/utils";
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class RestockNotification extends SoftDeletableEntity {
  @Index()
  @Column()
  variant_id: string;

  @ManyToOne(() => ProductVariant, { cascade: true })
  @JoinColumn({ name: "variant_id" })
  variant: ProductVariant;

  @Column({ type: "jsonb" })
  emails: string[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "rnot");
  }
}
