import { SiteHeader } from "@/components/dashboard/site-header";
import { getLDClient } from "@/lib/ld-server";
import { MyClientComponent } from "./_components/MyClientComponent";
import { cookies } from "next/headers";

export default async function PlaygroundPage() {
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
      <SiteHeader title="Playground" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50">
            <MyClientComponent />
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div className="p-4 rounded-lg bg-muted">
            <h2 className="text-lg font-semibold mb-2">
              SERVER COMPONENT Feature Flag Status
            </h2>
            <p className="text-sm">
              The feature flag my-feature-flag is currently{" "}
              <span
                className={isFeatureEnabled ? "text-green-600" : "text-red-600"}
              >
                {isFeatureEnabled ? "enabled" : "disabled"}
              </span>
            </p>
          </div>
          <p>User: {user.key}</p>
        </div>
      </div>
    </>
  );
}
