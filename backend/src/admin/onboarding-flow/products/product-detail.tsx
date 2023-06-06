import React from "react";
import { useAdminPublishableApiKeys } from "medusa-react";
import Button from "../../shared/button";
import CodeSnippets from "../../shared/code-snippets";
import { StepContentProps } from "../onboarding-flow";

const ProductDetail = ({ onNext, isComplete, data }: StepContentProps) => {
  const { publishable_api_keys: keys, isLoading } = useAdminPublishableApiKeys({
    offset: 0,
    limit: 1,
  });
  const api_key = keys?.[0]?.id || "pk_01H0PY648BTMEJR34ZDATXZTD9";
  return (
    <div>
      <p>On this page, you can view your product's details and edit them.</p>
      <p>
        You can preview your product using Medusa's Store APIs. You can copy any
        of the following code snippets to try it out.
      </p>
      <div className="pt-4">
        {!isLoading && (
          <CodeSnippets
            snippets={[
              {
                label: "cURL",
                language: "markdown",
                code: `curl 'http://localhost:9000/store/products/${data?.product_id}' -H 'x-publishable-key: ${api_key}'`,
              },
              {
                label: "Medusa JS Client",
                language: "jsx",
                code: `// To install the JS Client in your storefront project\n// yarn add @medusajs/medusa-js\n\nconst medusa = new Medusa({ publishableApiKey: '${api_key}'})\nmedusa.products.retrieve("${data?.product_id}")\n.then(({ product }) => {\n  console.log(product.id)\n})`,
              },
              {
                label: "Medusa React",
                language: "tsx",
                code: `// To install the React SDK in your storefront project\n// yarn add medusa-react\nimport { useProduct } from "medusa-react"\n\nconst { product } = useProduct('${data?.product_id}')\nconsole.log(product.id)`,
              },
            ]}
          />
        )}
      </div>
      <div className="flex mt-base gap-2">
        <a
          href={`http://localhost:9000/store/products/${data?.product_id}`}
          target="_blank"
        >
          <Button variant="secondary" size="small">
            Open preview in browser
          </Button>
        </a>
        {!isComplete && (
          <Button variant="primary" size="small" onClick={() => onNext()}>
            Next step
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
