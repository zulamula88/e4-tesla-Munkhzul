import Image from "next/image";
import CalInitializer from "./CalInitializer";

const calAttributes = {
  "data-cal-link": "munkhzul-batbaatar-fz2k49/tesla-model-3",
  "data-cal-namespace": "tesla-model-3",
  "data-cal-config": JSON.stringify({
    layout: "month_view",
    useSlotsViewOnSmallScreen: "true"
  })
};

const navigation = [
  ["Vehicles", "#vehicles"],
  ["Energy", "#energy"],
  ["Charging", "#charging"],
  ["Discover", "#discover"],
  ["Shop", "#shop"]
];

const primaryButton =
  "motion-control tap-transparent inline-flex min-h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-md border-0 bg-royal-blue px-5 py-2 font-sans font-medium leading-6 text-white shadow-[0_1px_1px_rgba(3,4,12,0.05),inset_0_32px_24px_rgba(255,255,255,0.05),inset_0_2px_1px_rgba(255,255,255,0.25),inset_0_-2px_1px_rgba(0,0,0,0.2)] transition-[transform,box-shadow,background-color] duration-160 hover:-translate-y-px hover:bg-[#354bdb] active:translate-y-0";

export default function SiteHeader() {
  return (
    <>
      <CalInitializer />
      <a
        className="fixed top-3 left-3 z-[100] -translate-y-[150%] rounded-md bg-white px-4 py-2.5 shadow-[0_4px_20px_rgba(3,4,12,0.2)] transition-transform duration-160 focus:translate-y-0"
        href="#main-content"
      >
        Skip to main content
      </a>

      <header className="relative z-20 h-[72px] bg-surface max-[600px]:h-16">
        <nav
          className="grid h-full w-full grid-cols-[1fr_auto_1fr] items-center gap-8 px-[var(--page-gutter)] max-[1100px]:gap-5 max-[800px]:grid-cols-[auto_1fr_auto] max-[600px]:grid-cols-[auto_1fr] max-[600px]:gap-3"
          aria-label="Primary navigation"
        >
          <a
            className="flex h-9 w-[84px] items-center justify-center max-[600px]:w-[76px]"
            href="#top"
            aria-label="Tesla home"
          >
            <Image
              src="/assets/tesla-logo.svg"
              alt="Tesla"
              width={70}
              height={36}
              priority
            />
          </a>

          <ul className="flex items-center gap-8 max-[1100px]:gap-[18px] max-[800px]:hidden">
            {navigation.map(([label, href]) => (
              <li key={href}>
                <a
                  className="whitespace-nowrap underline-offset-4 hover:underline"
                  href={href}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex justify-end max-[800px]:justify-self-end max-[600px]:hidden">
            <button type="button" className={primaryButton} {...calAttributes}>
              Test Drive
            </button>
          </div>

          <details className="relative hidden justify-self-end max-[800px]:block max-[600px]:col-start-2">
            <summary className="tap-transparent cursor-pointer list-none font-medium">
              Menu
            </summary>
            <ul className="absolute top-[calc(100%+18px)] right-0 grid w-[190px] gap-1 rounded-lg border border-black/15 bg-white p-3 shadow-[0_16px_36px_rgba(3,4,12,0.12)]">
              <li>
                <button
                  type="button"
                  className="block w-full cursor-pointer rounded-[5px] border-0 bg-transparent px-2.5 py-[9px] text-left font-sans hover:bg-surface"
                  {...calAttributes}
                >
                  Test Drive
                </button>
              </li>
              {navigation.map(([label, href]) => (
                <li key={href}>
                  <a
                    className="block w-full rounded-[5px] px-2.5 py-[9px] text-left hover:bg-surface"
                    href={href}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </header>
    </>
  );
}
