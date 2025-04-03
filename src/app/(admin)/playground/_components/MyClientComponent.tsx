"use client";

import { useFlags } from "launchdarkly-react-client-sdk";

export function MyClientComponent() {
  const flags = useFlags();
  const isFeatureEnabled = flags["myFeatureFlag"] ?? false;

  return (
    <div className="p-4 rounded-lg bg-muted">
      <h2 className="text-lg font-semibold mb-2">
        CLIENT COMPONENT Feature Flag Status
      </h2>
      <p className="text-sm">
        The feature flag my-feature-flag is currently{" "}
        <span className={isFeatureEnabled ? "text-green-600" : "text-red-600"}>
          {isFeatureEnabled ? "enabled" : "disabled"}
        </span>
      </p>
    </div>
  );
}
