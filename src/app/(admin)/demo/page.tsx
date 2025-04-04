import { SiteHeader } from "@/components/dashboard/site-header";

import { MyClientComponent } from "./_components/my-client-component";
import MyServerComponent from "./_components/my-server-component";
import { MyLdDetails } from "./_components/my-ld-details";
export default async function PlaygroundPage() {
  return (
    <>
      <SiteHeader title="Playground" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
            <MyLdDetails />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">
            <MyServerComponent />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">
            <MyClientComponent />
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
      </div>
    </>
  );
}
