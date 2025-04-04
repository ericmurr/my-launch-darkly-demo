"use client";

import { useFlags } from "launchdarkly-react-client-sdk";
import Image from "next/image";

export function MyClientComponent() {
  const flags = useFlags();
  const isFeatureEnabled = flags["recentCatsSection"] ?? false;

  return (
    <div className="p-4 rounded-lg bg-muted h-full">
      <h2 className="text-lg font-semibold mb-2">React CLIENT component</h2>
      <p className="text-sm">
        The feature flag is{" "}
        <span className={isFeatureEnabled ? "text-green-600" : "text-red-600"}>
          {isFeatureEnabled ? "enabled" : "disabled"}
        </span>
      </p>
      {isFeatureEnabled && (
        <p className="text-sm pt-10">
          <Image
            src="/kitten.jpg"
            alt="Cat"
            width={200}
            height={100}
            className="rounded-lg"
          />
        </p>
      )}
    </div>
  );
}
