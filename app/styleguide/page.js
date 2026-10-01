import Image from "next/image";
import Link from "next/link";
import Button from "../../components/ui/Button";
import Tabs from "../../components/ui/Tabs";

export const metadata = {
  title: "Styleguide — Tesla Model Y",
  description: "Visual foundations and reusable components used by the Tesla Model Y website."
};

const colors = [
  { name: "Ink", token: "ink", value: "#03040C", className: "bg-ink text-white" },
  { name: "Royal Blue", token: "royal-blue", value: "#4259E9", className: "bg-royal-blue text-white" },
  { name: "Blue Surface", token: "blue-surface", value: "#ECEEFC", className: "bg-blue-surface text-ink" },
  { name: "Blue Card", token: "blue-card", value: "#D9DDFA", className: "bg-blue-card text-ink" },
  { name: "Surface", token: "surface", value: "#F2F2F2", className: "bg-surface text-ink" },
  { name: "White", token: "white", value: "#FFFFFF", className: "bg-white text-ink" }
];

const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 80, 112];

const typography = [
  {
    name: "Display",
    meta: "Manrope Medium · 72 / 86",
    className: "text-[72px] leading-[1.2] font-medium tracking-[-0.72px] max-[700px]:text-5xl",
    sample: "Model Y"
  },
  {
    name: "Heading 1",
    meta: "Manrope Medium · 52 / 62",
    className: "text-[52px] leading-[1.2] font-medium tracking-[-0.52px] max-[700px]:text-4xl",
    sample: "Current Offers"
  },
  {
    name: "Heading 2",
    meta: "Manrope Medium · 36 / 43",
    className: "text-4xl leading-[1.2] font-medium tracking-[-0.36px]",
    sample: "Find Your Charge"
  },
  {
    name: "Subtitle",
    meta: "Manrope Medium · 22 / 31",
    className: "text-[22px] leading-[31px] font-medium tracking-[-0.22px]",
    sample: "Destination Chargers"
  },
  {
    name: "Body Large",
    meta: "Manrope Regular · 18 / 27",
    className: "text-lg leading-[27px]",
    sample: "Explore limited-time offers on Tesla vehicles."
  },
  {
    name: "Body",
    meta: "Manrope Regular · 16 / 24",
    className: "text-base leading-6",
    sample: "Makes every drive easier."
  },
  {
    name: "Small",
    meta: "Manrope Regular · 14 / 21",
    className: "text-sm leading-[21px]",
    sample: "Tesla © 2026"
  }
];

const vehicleTabs = [
  { value: "model-3", label: "Model 3", heading: "Explore Model 3" },
  { value: "premium", label: "Premium", heading: "Explore Model 3 Premium" },
  { value: "performance", label: "Performance", heading: "Explore Model 3 Performance" }
];

function ArrowRight() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 20 20" fill="none">
      <path
        d="M4.166 10h11.667M10.833 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <header className="mb-10 grid gap-4 lg:grid-cols-[260px_1fr] lg:gap-12">
      <p className="text-sm font-semibold tracking-[0.1em] text-royal-blue uppercase">{eyebrow}</p>
      <div>
        <h2 className="text-4xl leading-tight font-medium tracking-[-0.36px] max-[600px]:text-3xl">
          {title}
        </h2>
        {description ? <p className="mt-3 max-w-[700px] leading-7 text-black/55">{description}</p> : null}
      </div>
    </header>
  );
}

function TokenLabel({ children }) {
  return (
    <code className="rounded bg-black/[0.055] px-2 py-1 font-mono text-xs leading-5 text-black/60">
      {children}
    </code>
  );
}

function GuideSection({ children, id }) {
  return (
    <section className="scroll-mt-8 border-t border-black/15 py-16 max-[600px]:py-12" id={id}>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/90 px-[var(--page-gutter)] backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-6 max-[600px]:h-16">
          <div className="flex items-center gap-5">
            <Link className="flex h-9 w-[84px] items-center justify-center" href="/" aria-label="Tesla home">
              <Image src="/assets/tesla-logo.svg" alt="Tesla" width={70} height={36} priority />
            </Link>
            <span className="h-5 w-px bg-black/15" aria-hidden="true" />
            <span className="text-sm font-semibold">Styleguide</span>
          </div>
          <div className="flex items-center gap-3">
            <Button className="max-[600px]:hidden" href="/uilibrary" size="small" variant="text">
              UI Library
            </Button>
            <Button href="/" size="small" variant="secondary">
              Back to website
            </Button>
          </div>
        </div>
      </header>

      <div className="px-[var(--page-gutter)]">
        <div className="mx-auto w-full max-w-[1280px]">
          <header className="py-24 max-[700px]:py-16">
            <p className="text-sm font-semibold tracking-[0.12em] text-royal-blue uppercase">Tesla web system</p>
            <h1 className="mt-5 max-w-[900px] text-[72px] leading-[1.08] font-medium tracking-[-0.72px] max-[700px]:text-5xl max-[700px]:tracking-[-0.48px]">
              Home UI Styleguide
            </h1>
            <p className="mt-6 max-w-[720px] text-lg leading-7 text-black/55">
              Home page-д ашиглагдсан visual foundation, хэмжээс болон дахин ашиглах component-уудын амьд лавлах хуудас.
            </p>

            <nav className="scrollbar-none mt-10 flex gap-2 overflow-x-auto" aria-label="Styleguide sections">
              {[
                ["Typography", "#typography"],
                ["Colors", "#colors"],
                ["Spacing", "#spacing"],
                ["Ratios", "#ratios"],
                ["Strokes", "#strokes"],
                ["Shapes", "#shapes"],
                ["Components", "#components"]
              ].map(([label, href]) => (
                <a
                  className="whitespace-nowrap rounded-full border border-black/10 bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-royal-blue hover:text-royal-blue"
                  href={href}
                  key={href}
                >
                  {label}
                </a>
              ))}
            </nav>
          </header>

          <GuideSection id="typography">
            <SectionHeading
              eyebrow="01 · Foundation"
              title="Typography"
              description="Manrope нь үндсэн интерфэйсийн font, Roboto нь тоон үзүүлэлт болон зарим vehicle тайлбарт ашиглагдана."
            />
            <div className="overflow-hidden rounded-xl border border-black/10">
              {typography.map((style) => (
                <div
                  className="grid gap-6 border-t border-black/10 p-8 first:border-t-0 max-[800px]:grid-cols-1 max-[600px]:p-6 md:grid-cols-[180px_1fr]"
                  key={style.name}
                >
                  <div>
                    <p className="font-semibold">{style.name}</p>
                    <p className="mt-1 text-xs leading-5 text-black/45">{style.meta}</p>
                  </div>
                  <p className={style.className}>{style.sample}</p>
                </div>
              ))}
            </div>
          </GuideSection>

          <GuideSection id="colors">
            <SectionHeading
              eyebrow="02 · Foundation"
              title="Colors"
              description="Neutral surface-үүд болон үндсэн action өнгө. Text contrast-ыг цагаан эсвэл Ink өнгөөр хадгална."
            />
            <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
              {colors.map((color) => (
                <article className="overflow-hidden rounded-xl border border-black/10" key={color.token}>
                  <div className={`flex h-36 items-end p-5 ${color.className}`}>
                    <span className="text-sm font-semibold">{color.name}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 bg-white p-5">
                    <TokenLabel>{color.token}</TokenLabel>
                    <span className="font-mono text-xs text-black/50">{color.value}</span>
                  </div>
                </article>
              ))}
            </div>
          </GuideSection>

          <GuideSection id="spacing">
            <SectionHeading
              eyebrow="03 · Foundation"
              title="Spacing"
              description="4px base scale. Home page-ийн гол component-ууд 16, 24, 32, 48 болон 112px зайг түлхүү ашигладаг."
            />
            <div className="rounded-xl border border-black/10 p-8 max-[600px]:p-6">
              <div className="grid gap-5">
                {spacing.map((value) => (
                  <div className="grid grid-cols-[72px_1fr_54px] items-center gap-5" key={value}>
                    <TokenLabel>space-{value}</TokenLabel>
                    <div className="h-3 overflow-hidden rounded-full bg-surface">
                      <div
                        className="h-full rounded-full bg-royal-blue"
                        style={{ width: `${Math.min((value / 112) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-right font-mono text-xs text-black/50">{value}px</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 grid gap-4 border-t border-black/10 pt-8 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-semibold">Page gutter</p>
                  <p className="mt-2 text-sm text-black/50">64 / 32 / 24px</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Container</p>
                  <p className="mt-2 text-sm text-black/50">Max 1280px</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Section padding</p>
                  <p className="mt-2 text-sm text-black/50">112 / 80 / 64px</p>
                </div>
              </div>
            </div>
          </GuideSection>

          <GuideSection id="ratios">
            <SectionHeading
              eyebrow="04 · Foundation"
              title="Ratios"
              description="Зураг болон card-ийн харьцааг тогтвортой байлгаснаар responsive layout жигд харагдана."
            />
            <div className="grid grid-cols-4 items-end gap-5 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
              {[
                ["Hero media", "16:9", "aspect-video"],
                ["Square media", "1:1", "aspect-square"],
                ["Portrait card", "4:5", "aspect-[4/5]"],
                ["Split layout", "1:1", "aspect-square"]
              ].map(([name, ratio, ratioClass]) => (
                <article key={name}>
                  <div className={`grid place-items-center rounded-lg bg-blue-surface ${ratioClass}`}>
                    <span className="text-2xl font-medium">{ratio}</span>
                  </div>
                  <p className="mt-4 font-semibold">{name}</p>
                  <p className="mt-1 font-mono text-xs text-black/45">{ratio}</p>
                </article>
              ))}
            </div>
          </GuideSection>

          <GuideSection id="strokes">
            <SectionHeading
              eyebrow="05 · Foundation"
              title="Strokes"
              description="Border болон focus stroke нь layout-ийг хүнд болголгүй component-ийн хил, interaction төлөвийг ялгана."
            />
            <div className="grid gap-5 lg:grid-cols-3">
              <article className="rounded-xl border border-black/10 p-7">
                <div className="h-20 rounded-lg border border-black/15" />
                <h3 className="mt-5 font-semibold">Default border</h3>
                <p className="mt-2 text-sm text-black/50">1px · Ink 15%</p>
              </article>
              <article className="rounded-xl border border-black/10 p-7">
                <div className="flex h-20 items-end">
                  <div className="h-1 w-full bg-royal-blue" />
                </div>
                <h3 className="mt-5 font-semibold">Active indicator</h3>
                <p className="mt-2 text-sm text-black/50">4px · Royal Blue</p>
              </article>
              <article className="rounded-xl border border-black/10 p-7">
                <div className="h-20 rounded-lg outline-3 outline-offset-3 outline-[#93a1ff]" />
                <h3 className="mt-5 font-semibold">Focus ring</h3>
                <p className="mt-2 text-sm text-black/50">3px · #93A1FF</p>
              </article>
            </div>
          </GuideSection>

          <GuideSection id="shapes">
            <SectionHeading
              eyebrow="06 · Foundation"
              title="Shapes & radius"
              description="Жижиг control-д 4–6px, card болон том container-д 8–16px radius ашиглана."
            />
            <div className="grid grid-cols-5 gap-5 max-[900px]:grid-cols-3 max-[560px]:grid-cols-2">
              {[
                ["4px", "rounded"],
                ["6px", "rounded-md"],
                ["8px", "rounded-lg"],
                ["12px", "rounded-xl"],
                ["Pill", "rounded-full"]
              ].map(([label, radiusClass]) => (
                <div key={label}>
                  <div className={`aspect-square border border-black/10 bg-blue-card ${radiusClass}`} />
                  <p className="mt-3 text-sm font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </GuideSection>

          <GuideSection id="components">
            <SectionHeading
              eyebrow="07 · Library"
              title="Components"
              description="Home болон Vehicles хуудсанд ашиглагдаж байгаа interactive болон content component-ууд."
            />

            <div className="grid gap-6">
              <article className="rounded-xl border border-black/10 p-8 max-[600px]:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">Buttons</h3>
                    <p className="mt-1 text-sm text-black/50">Primary, secondary, outline, text</p>
                  </div>
                  <Button className="max-[600px]:hidden" href="/uilibrary" size="small" variant="text">
                    View all
                    <ArrowRight />
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button>Order Now</Button>
                  <Button variant="secondary">Learn More</Button>
                  <Button variant="outline">Schedule Demo</Button>
                  <Button variant="text">
                    Learn More
                    <ArrowRight />
                  </Button>
                </div>
              </article>

              <article className="overflow-hidden rounded-xl border border-black/10">
                <div className="border-b border-black/10 p-8 max-[600px]:p-6">
                  <h3 className="text-xl font-semibold">Tabs</h3>
                  <p className="mt-1 text-sm text-black/50">Selected, hover, focus болон keyboard navigation</p>
                </div>
                <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f2f2f2_100%)] px-8 py-16 max-[600px]:px-4 max-[600px]:py-12">
                  <Tabs ariaLabel="Styleguide vehicle tabs" defaultValue="model-3" items={vehicleTabs} />
                </div>
              </article>

              <div className="grid gap-6 lg:grid-cols-2">
                <article className="relative isolate flex min-h-[420px] items-end overflow-hidden rounded-xl p-8 text-white">
                  <Image
                    className="-z-20 object-cover"
                    src="/assets/vehicle-card.png"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 -z-10 bg-black/40" />
                  <div>
                    <Image src="/assets/vehicle-logo-y.svg" alt="Model Y" width={120} height={48} />
                    <p className="mt-6 font-roboto text-lg leading-[27px]">Long Wheelbase Midsize SUV</p>
                    <p className="mt-6 font-semibold">Model Y L Premium</p>
                    <p>Starting at $61,9902</p>
                  </div>
                </article>

                <article className="grid min-h-[420px] content-center rounded-xl bg-surface p-10 max-[600px]:p-8">
                  <p className="text-sm font-semibold tracking-[0.1em] text-royal-blue uppercase">Stat block</p>
                  <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div className="border-l border-black/15 pl-6">
                      <dt className="font-roboto text-[64px] leading-none font-bold">428</dt>
                      <dd className="mt-3 text-lg font-medium">Superchargers</dd>
                    </div>
                    <div className="border-l border-black/15 pl-6">
                      <dt className="font-roboto text-[64px] leading-none font-bold">26</dt>
                      <dd className="mt-3 text-lg font-medium">Destination Chargers</dd>
                    </div>
                  </dl>
                </article>
              </div>

              <article className="grid gap-4 rounded-xl border border-black/10 p-8 max-[600px]:p-6 sm:grid-cols-3">
                <div className="rounded-md bg-[rgba(3,4,12,0.68)] px-4 py-3 text-sm text-white">
                  Information message
                </div>
                <div className="rounded-md bg-[rgba(25,101,52,0.86)] px-4 py-3 text-sm text-white">
                  Success message
                </div>
                <div className="rounded-md bg-[rgba(160,30,45,0.88)] px-4 py-3 text-sm text-white">
                  Error message
                </div>
              </article>
            </div>
          </GuideSection>

          <footer className="flex items-center justify-between gap-6 border-t border-black/15 py-10 text-sm text-black/50 max-[600px]:flex-col max-[600px]:items-start">
            <p>Tesla Home UI Styleguide</p>
            <p>Next.js + Tailwind CSS</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
