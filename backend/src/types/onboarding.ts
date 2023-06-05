import { OnboardingState } from "../models/onboarding";

export type UpdateOnboardingStateInput = {
  current_step?: string;
  is_complete?: boolean;
};

export interface AdminOnboardingUpdateStateReq {}

export type OnboardingStateRes = {
  status: OnboardingState;
};
