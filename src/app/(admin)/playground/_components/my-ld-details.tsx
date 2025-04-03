"use client";

import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import { useEffect, useState } from "react";
import { LDContext } from "launchdarkly-js-sdk-common";

export function MyLdDetails() {
  const flags = useFlags();
  const ldClient = useLDClient();
  const [user, setUser] = useState<LDContext | null>(null);

  useEffect(() => {
    if (ldClient) {
      const currentUser = ldClient.getContext();
      setUser(currentUser);
    }
  }, [ldClient]);

  return (
    <div className="p-4 rounded-lg bg-muted">
      <h2 className="text-lg font-semibold mb-2">FLAG INFO</h2>

      <div className="text-sm pt-4">
        <p className="font-medium mb-1">All Feature Flags:</p>
        <pre className="p-2 rounded text-xs overflow-auto">
          {JSON.stringify(flags, null, 2)}
        </pre>
      </div>
      <div className="text-sm pt-4">
        <p className="font-medium mb-1">User Context:</p>
        <pre className="p-2 rounded text-xs overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
