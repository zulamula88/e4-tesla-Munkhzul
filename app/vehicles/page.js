import SiteHeader from "../../components/SiteHeader";
import Tabs from "../../components/ui/Tabs";

export const metadata = {
  title: "Vehicles — Tesla"
};

const vehicleTabs = [
  {
    value: "model-3",
    label: "Model 3",
    heading: "Explore Model 3"
  },
  {
    value: "premium",
    label: "Premium",
    heading: "Explore Model 3 Premium"
  },
  {
    value: "performance",
    label: "Performance",
    heading: "Explore Model 3 Performance"
  }
];

export default function VehiclesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100svh-72px)] bg-[linear-gradient(180deg,#ffffff_0%,#f7f7f7_42%,#eeeeee_100%)] px-[var(--page-gutter)] pt-20 max-[600px]:min-h-[calc(100svh-64px)] max-[600px]:pt-14">
        <div className="mx-auto w-full max-w-[1280px]">
          <Tabs
            ariaLabel="Choose a Model 3 variant"
            defaultValue="model-3"
            items={vehicleTabs}
          />
        </div>
      </main>
    </>
  );
}
