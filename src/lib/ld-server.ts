import "server-only";

// lib/ldClient.ts
import LaunchDarkly from "launchdarkly-node-server-sdk";

declare global {
  // Extend the global scope with our ldClient property
  // eslint-disable-next-line no-var
  var ldClient: LaunchDarkly.LDClient | undefined;
}

export async function getLDClient(): Promise<LaunchDarkly.LDClient> {
  if (globalThis.ldClient) {
    return globalThis.ldClient;
  }

  // Initialize and store the client on the global object
  const client = LaunchDarkly.init(process.env.LD_SDK_KEY!);
  await client.waitForInitialization();
  globalThis.ldClient = client;

  return client;
}
