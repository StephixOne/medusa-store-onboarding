import React from "react";
import Button from "../../shared/button";
import { useAdminCreateProduct } from "medusa-react";
import { useAdminRegions } from "medusa-react";
import { StepContentProps } from "../onboarding-flow";

// Needed for sample product creation — not exported by anything importable here
enum ProductStatus {
  PUBLISHED = "published",
}

const ProductsList = ({ onNext, isComplete }: StepContentProps) => {
  const { mutate: createProduct, isLoading } = useAdminCreateProduct();
  const { regions } = useAdminRegions();

  const createSampleProduct = async () => {
    createProduct(
      {
        title: "A coat or something idk",
        description: "Lorem Ipsum Dolor Sit Amet",
        is_giftcard: false,
        discountable: false,
        options: [{ title: "Size" }],
        variants: [
          {
            title: "Medium",
            inventory_quantity: 10,
            manage_inventory: true,
            prices: regions.map(region => ({
              amount: 5000,
              currency_code: region.currency_code,
            })),
            options: [{ value: "M" }],
          },
        ],
        status: ProductStatus.PUBLISHED,
      },
      {
        onSuccess: ({ product }) => {
          onNext(product);
        },
        onError: err => console.log(err),
      }
    );
  };

  return (
    <div>
      <p>
        Create a product and set its general details such as title and
        description, its price, options, variants, images, and more. You'll then
        use the product to create a sample order.
      </p>
      <p>
        If you're not ready to create a product, we can create a sample product
        for you.
      </p>
      {!isComplete && (
        <div className="flex gap-2 mt-4">
          <Button
            variant="secondary"
            size="small"
            onClick={() => createSampleProduct()}
            loading={isLoading}
          >
            Create sample product
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
