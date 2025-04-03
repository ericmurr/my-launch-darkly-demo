"use client";

import { withLDProvider, useLDClient } from "launchdarkly-react-client-sdk";
import type { ReactNode } from "react";
import { useUser } from "@/contexts/user-context";
import type { LDUser } from "launchdarkly-react-client-sdk";
import { useMemo, useEffect, useRef } from "react";

interface LDProviderProps {
  children: ReactNode;
  user?: LDUser;
}

const Providers = ({ children }: LDProviderProps) => {
  const ldClient = useLDClient();
  const initialized = useRef(false);

  useEffect(() => {
    if (ldClient && !initialized.current) {
      initialized.current = true;
      ldClient.waitForInitialization(5000).catch((error) => {
        console.error("[LaunchDarkly] Initialization error:", error);
      });
    }
  }, [ldClient]);

  return <>{children}</>;
};

// Export a component that uses the user from context
export function LaunchDarklyProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const lastUserKey = useRef<string | null>(null);

  // Memoize the wrapper with the current user
  const Wrapper = useMemo(() => {
    // Only recreate the wrapper if the user key changes
    if (user?.key !== lastUserKey.current) {
      lastUserKey.current = user?.key ?? null;
      return withLDProvider<LDProviderProps>({
        clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_ID as string,
        user: user || { key: "anonymous" },
        options: {
          bootstrap: "localStorage",
        },
      })(Providers);
    }
    return null;
  }, [user?.key]); // Only depend on the user key

  if (!Wrapper) {
    return <>{children}</>;
  }

  return <Wrapper>{children}</Wrapper>;
}
