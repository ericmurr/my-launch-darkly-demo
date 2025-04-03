"use client";

import type { ReactNode } from "react";
import { UserProvider } from "@/contexts/user-context";

interface BaseProvidersProps {
  children: ReactNode;
}

export function BaseProviders({ children }: BaseProvidersProps) {
  return <UserProvider>{children}</UserProvider>;
}
