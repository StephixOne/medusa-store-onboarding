import React, { useState, useEffect } from "react";
import { Container } from "../shared/container";
import Button from "../shared/button";
import { ExtensionConfig } from "@medusajs/admin-sdk";
import type { ExtensionProps } from "@medusajs/admin-shared";
import Accordion from "../shared/accordion";
import GetStartedIcon from "../shared/icons/get-started-icon";
import ProductsList from "./products/products-list";
import ProductDetail from "./products/product-detail";
import OrdersList from "./orders/orders-list";
import OrderDetail from "./orders/order-detail";
import {
  useAdminOnboardingState,
  useAdminUpdateOnboardingStateMutation,
} from "../shared/hooks";
import {
  AdminOnboardingUpdateStateReq,
  OnboardingStateRes,
  UpdateOnboardingStateInput,
} from "../../types/onboarding";

type STEP_ID =
  | "create_product"
  | "preview_product"
  | "create_order"
  | "setup_finished";

type Step = {
  id: STEP_ID;
  title: string;
  component: React.FC<ExtensionProps & any>;
  onNext?: Function;
};

const STEP_FLOW: STEP_ID[] = [
  "create_product",
  "preview_product",
  "create_order",
  "setup_finished",
];

const OnboardingFlow = (props: ExtensionProps) => {
  const { data, isLoading } = useAdminOnboardingState<OnboardingStateRes>("");
  const { mutate } = useAdminUpdateOnboardingStateMutation<
    AdminOnboardingUpdateStateReq,
    OnboardingStateRes
  >("");

  // TODO return nothing if we're done?
  // if (!isLoading && data?.status?.is_complete) return null;

  const { navigate } = props;

  const currentStep: STEP_ID | undefined = data?.status
    ?.current_step as STEP_ID;

  const updateServerState = (payload: UpdateOnboardingStateInput) => {
    mutate(payload, { onSuccess: data => console.log({ data }) });
  };

  const onStart = () => {
    updateServerState({ current_step: STEP_FLOW[0] });
  };

  const setStepComplete = (step_id: STEP_ID) => {
    const next = STEP_FLOW[STEP_FLOW.findIndex(step => step === step_id) + 1];
    updateServerState({ current_step: next });
  };

  const goToProductView = (product: any) => {
    setStepComplete("create_product");
    navigate(`/a/products/${product.id}`);
  };

  const goToOrders = () => {
    setStepComplete("preview_product");
    navigate(`/a/orders`);
  };

  const goToOrderView = (order: any) => {
    setStepComplete("create_order");
    navigate(`/a/orders/${order.id}`);
  };

  const onComplete = () => {
    updateServerState({ is_complete: true });
  };

  const Steps: Step[] = [
    {
      id: "create_product",
      title: "Create Product",
      component: ProductsList,
      onNext: goToProductView,
    },
    {
      id: "preview_product",
      title: "Preview Product",
      component: ProductDetail,
      onNext: goToOrders,
    },
    {
      id: "create_order",
      title: "Create an Order",
      component: OrdersList,
      onNext: goToOrderView,
    },
    {
      id: "setup_finished",
      title: "Setup Finished: Start developing with Medusa",
      component: OrderDetail,
    },
  ];

  const isStepComplete = (step_id: STEP_ID) =>
    STEP_FLOW.indexOf(currentStep) > STEP_FLOW.indexOf(step_id);

  return (
    <>
      <Container>
        <Accordion
          type="single"
          className="mt-3"
          value={currentStep}
          // onValueChange={onSectionOpen}
        >
          <div className="flex pb-5 items-center">
            <div className="mr-3">
              <GetStartedIcon />
            </div>
            <div>
              <h1 className="font-semibold text-lg">Get started</h1>
              <p>Learn the basics of Medusa by creating your first order.</p>
            </div>
            <div className="ml-auto flex items-start gap-2">
              {!!currentStep ? (
                <>
                  {currentStep === STEP_FLOW[STEP_FLOW.length - 1] ? (
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => onComplete()}
                    >
                      Complete Setup
                    </Button>
                  ) : (
                    <Button variant="secondary" size="small">
                      Cancel Setup
                    </Button>
                  )}
                  <Button
                    variant="nuclear"
                    size="small"
                    onClick={() => {
                      updateServerState({ current_step: null });
                      navigate("/a/products");
                    }}
                  >
                    Reset flow (DEV)
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" size="small">
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => onStart()}
                  >
                    Begin setup
                  </Button>
                </>
              )}
            </div>
          </div>
          {Steps.map(step => (
            <Accordion.Item
              title={step.title}
              value={step.id}
              headingSize="medium"
              active={currentStep === step.id}
              complete={isStepComplete(step.id)}
            >
              <div className="py-3 px-11 text-gray-500">
                <step.component onNext={step.onNext} {...props} />
              </div>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </>
  );
};

export const config: ExtensionConfig = {
  type: "widget",
  zone: [
    "product.list.before",
    "product.details.before",
    "order.list.before",
    "order.details.before",
  ],
};

export default OnboardingFlow;
