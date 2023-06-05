import { BaseEntity } from "@medusajs/utils";
import { Index, Column, Entity } from "typeorm";

@Entity()
export class OnboardingState extends BaseEntity {
  @Index()
  @Column()
  id: string;

  @Column()
  current_step: string;

  @Column()
  is_complete: boolean;
}