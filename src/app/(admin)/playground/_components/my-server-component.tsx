import Image from "next/image";
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
    "recent-cats-section",
    user,
    false
  );
  return (
    <>
      <div className="p-4 rounded-lg bg-muted h-full">
        <h2 className="text-lg font-semibold mb-2">React SERVER component</h2>
        <p className="text-sm">
          The feature flag is{" "}
          <span
            className={isFeatureEnabled ? "text-green-600" : "text-red-600"}
          >
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
    </>
  );
}
