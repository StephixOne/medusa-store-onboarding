import React from "react";
import Button from "../../shared/button";
import CodeSnippets from "../../shared/code-snippets";

const ProductDetail = ({ onNext, ...props }) => {
  return (
    <div>
      <p>On this page, you can view your product's details and edit them.</p>
      <p>
        You can preview your product using Medusa's Store APIs. You can copy any
        of the following code snippets to try it out.
      </p>
      <div className="pt-4">
        <CodeSnippets
          snippets={[
            {
              label: "cURL",
              language: "markdown",
              code: `curl -L -X GET 'http://localhost:9000/store/products/${props?.undefined?.id}' \n -H 'x-publishable-key: pk_01H0PY648BTMEJR34ZDATXZTD9'`,
            },
            {
              label: "Medusa JS Client",
              language: "jsx",
              code: `// To install the JS Client in your storefront project\n// yarn add @medusajs/medusa-js\nconst medusa = new Medusa({ publishableApiKey: ‘pk_01H0PY648BTMEJR34ZDATXZTD9’})\nmedusa.products.retrieve("${props?.undefined?.id}")\n.then(({ product }) => {\n  console.log(product.id);\n});`,
            },
            {
              label: "Medusa React",
              language: "tsx",
              code: "// TODO: Write React example lol",
            },
          ]}
        />
      </div>
      <div className="flex mt-base gap-2">
        <a href="#">
          <Button variant="secondary" size="small">
            Open preview in browser
          </Button>
        </a>
        <Button variant="primary" size="small" onClick={() => onNext()}>
          Next step
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
