import { getLDClient } from "@/lib/ld-server";
import { cookies } from "next/headers";

export default async function MyServerComponent() {
  // Get the user from the cookie directly
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("ld_user");

  let user = { key: "anonymous" };
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }

  const ldClient = await getLDClient();
  const isFeatureEnabled = await ldClient.variation(
    "my-feature-flag",
    user,
    false
  );
  return (
    <>
      <div className="p-4 rounded-lg bg-muted">
        <h2 className="text-lg font-semibold mb-2">SERVER COMPONENT</h2>
        <p className="text-sm">
          The feature flag is{" "}
          <span
            className={isFeatureEnabled ? "text-green-600" : "text-red-600"}
          >
            {isFeatureEnabled ? "enabled" : "disabled"}
          </span>
        </p>
        {/* <div className="text-sm pt-4">
          <p className="font-medium mb-1">User Context:</p>
          <pre className="p-2 rounded text-xs overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div> */}
      </div>
    </>
  );
}
