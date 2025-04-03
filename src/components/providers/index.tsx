"use client";

import type { ReactNode } from "react";
import { BaseProviders } from "./base-providers";
import { LaunchDarklyProvider } from "./launchdarkly-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BaseProviders>
      <LaunchDarklyProvider>{children}</LaunchDarklyProvider>
    </BaseProviders>
  );
}
