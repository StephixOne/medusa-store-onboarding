import Subscribe from "@/components/subscribe";
import { MEDUSA_API_URL } from "@/lib/constants";
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import Image from "next/image";

async function getProduct() {
  const res = await fetch(`${MEDUSA_API_URL}/store/products?limit=1`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const { products } = await res.json();

  return products as PricedProduct[];
}

export default async function Home() {
  const products = await getProduct();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {products.map((product) => {
        const isOutOfStock =
          (product.variants?.[0]?.inventory_quantity || 0) < 1;

        return (
          <div key={product.id} className="flex items-center gap-x-6 relative">
            <div>
              <Image
                src={product.thumbnail!}
                width={400}
                height={400}
                alt="Product thumbnail"
                className="rounded-lg"
              />
            </div>
            <div>
              <div className="pt-4">
                <div className="flex flex-col gap-y-1">
                  <h2 className="text-2xl font-bold">{product.title}</h2>
                  <p className="text-gray-500">{product.description}</p>
                </div>
                <div className="mt-6">
                  {isOutOfStock && (
                    <div>
                      <p className="text-red-500 text-lg font-semibold">
                        Out of stock
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Subscribe variantId={product.variants?.[0]?.id!} />
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}
