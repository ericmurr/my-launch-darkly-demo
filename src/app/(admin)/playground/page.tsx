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
  const featureEnabled = await ldClient.variation(
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
          <p>Feature enabled: {featureEnabled ? "Yes" : "No"}</p>
          <p>User: {user.key}</p>
        </div>
      </div>
    </>
  );
}
