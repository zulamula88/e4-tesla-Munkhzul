import Image from "next/image";
import CheckoutControls from "../components/CheckoutControls";
import SiteHeader from "../components/SiteHeader";

const container = "mx-auto w-full max-w-[1280px]";
const sectionGutter = "px-[var(--page-gutter)]";
const heading =
  "text-[52px] leading-[1.2] font-medium tracking-[-0.52px] max-[600px]:text-4xl max-[600px]:tracking-[-0.36px]";
const buttonBase =
  "motion-control tap-transparent inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md border-0 px-6 py-2.5 font-medium leading-6 shadow-[0_1px_2px_rgba(3,4,12,0.05),inset_0_-2px_1px_rgba(3,4,12,0.05)] transition-[transform,box-shadow,background-color] duration-160 hover:-translate-y-px active:translate-y-0";
const primaryButton = `${buttonBase} bg-royal-blue text-white shadow-[0_1px_1px_rgba(3,4,12,0.05),inset_0_32px_24px_rgba(255,255,255,0.05),inset_0_2px_1px_rgba(255,255,255,0.25),inset_0_-2px_1px_rgba(0,0,0,0.2)] hover:bg-[#354bdb]`;
const lightButton = `${buttonBase} bg-black/5 text-ink`;
const textLink =
  "inline-flex min-h-6 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium leading-6 hover:underline hover:underline-offset-4";
const carouselArrow =
  "motion-control flex size-12 items-center justify-center rounded border border-white bg-surface transition-[transform,background-color] duration-160 hover:-translate-y-px hover:bg-[#e8e8e9] active:translate-y-0";

const vehicles = [
  {
    id: "vehicle-1",
    logo: "/assets/vehicle-logo-y.svg",
    logoAlt: "Model Y",
    type: "Long Wheelbase Midsize SUV",
    name: "Model Y L Premium",
    offer: "Starting at $61,9902"
  },
  {
    id: "vehicle-2",
    logo: "/assets/vehicle-logo-3.svg",
    logoAlt: "Model 3",
    type: "Sport Sedan",
    name: "Model 3",
    offer: "Lease From $419/mo"
  },
  {
    id: "vehicle-3",
    logo: "/assets/vehicle-logo-y.svg",
    logoAlt: "Model Y",
    type: "Midsize SUV",
    name: "Model Y",
    offer: "Lease From $499/mo"
  },
  {
    id: "vehicle-4",
    logo: "/assets/vehicle-logo-3.svg",
    logoAlt: "Model 3",
    type: "Performance Sedan",
    name: "Model 3 Performance",
    offer: "Built for exhilarating drives"
  },
  {
    id: "vehicle-5",
    logo: "/assets/vehicle-logo-y.svg",
    logoAlt: "Model Y",
    type: "All-Electric Crossover",
    name: "Model Y Long Range",
    offer: "Go farther between charges"
  },
  {
    id: "vehicle-6",
    logo: "/assets/vehicle-logo-3.svg",
    logoAlt: "Model 3",
    type: "Electric Sport Sedan",
    name: "Model 3 Long Range",
    offer: "Designed for the open road"
  }
];

const products = [
  ["product-1", "/assets/solar-roof.png", "Tesla Solar Roof panels"],
  ["product-2", "/assets/gallery-2.png", "Tesla home energy product"],
  ["product-3", "/assets/gallery-3.png", "Tesla energy storage product"]
];

const footerLinks = [
  ["Vehicles", "/vehicles"],
  ["Energy", "/energy"],
  ["Charging", "/charging"],
  ["Discover", "/discover"],
  ["Shop", "/shop"]
];

function ChevronLink({ href, children }) {
  return (
    <a className={textLink} href={href}>
      {children}
      <Image src="/assets/chevron-right.svg" alt="" width={24} height={24} />
    </a>
  );
}

function CarouselControls({ dots, dotsAlt, previous, next, className = "" }) {
  return (
    <div
      className={`flex h-12 w-full items-center justify-between ${className}`}
    >
      <Image src={dots} alt={dotsAlt} width={dots.includes("6") ? 88 : 40} height={8} />
      <div className="flex gap-4">
        <a className={carouselArrow} href={previous} aria-label="Previous slide">
          <Image src="/assets/arrow-back.svg" alt="" width={24} height={24} />
        </a>
        <a className={carouselArrow} href={next} aria-label="Next slide">
          <Image src="/assets/arrow-forward.svg" alt="" width={24} height={24} />
        </a>
      </div>
    </div>
  );
}

function SectionTitle({ id, title }) {
  return (
    <header className="flex w-full max-w-[768px] flex-col gap-6">
      <h2 className={heading} id={id}>
        {title}
      </h2>
      <p className="text-lg leading-[27px] max-[600px]:text-base max-[600px]:leading-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </header>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <section
          className={`relative isolate flex h-[900px] items-center justify-center overflow-hidden text-white ${sectionGutter} max-[600px]:h-[max(700px,calc(100svh-64px))] max-[600px]:min-h-[700px]`}
          id="top"
          aria-labelledby="hero-title"
        >
          <Image
            className="-z-20 object-cover"
            src="/assets/hero-model-y.png"
            alt=""
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 -z-10 bg-black/40" aria-hidden="true" />

          <div className="flex w-full max-w-[768px] flex-col items-center gap-8 text-center max-[600px]:-translate-y-[52px]">
            <div className="flex w-full flex-col gap-6">
              <h1
                className="text-[72px] leading-[1.2] font-medium tracking-[-0.72px] max-[600px]:text-5xl max-[600px]:tracking-[-0.48px]"
                id="hero-title"
              >
                Model Y
              </h1>
              <p className="text-lg leading-[27px] max-[600px]:text-base max-[600px]:leading-6">
                1.49% APR Available
              </p>
            </div>
            <CheckoutControls />
          </div>

          <nav
            className="scrollbar-none smooth-track absolute bottom-20 left-1/2 grid h-20 w-[min(1024px,calc(100%-128px))] -translate-x-1/2 grid-cols-4 items-center gap-4 max-[800px]:left-[var(--page-gutter)] max-[800px]:w-[calc(100%-var(--page-gutter))] max-[800px]:translate-x-0 max-[800px]:grid-cols-[repeat(4,190px)] max-[800px]:overflow-x-auto max-[600px]:bottom-6 max-[600px]:grid-cols-[repeat(4,160px)]"
            aria-label="Featured vehicle models"
          >
            <a
              className="flex h-14 items-center justify-center border-b-4 border-white px-8 py-4 text-center whitespace-nowrap max-[600px]:px-4"
              href="#top"
              aria-current="page"
            >
              Model Y
            </a>
            <a
              className="flex h-20 self-stretch items-start justify-center border-b-4 border-[#b3b3b6] px-8 py-4 text-center whitespace-nowrap max-[600px]:px-4"
              href="#vehicle-2"
            >
              Model 3
            </a>
            <a
              className="flex h-14 items-center justify-center border-b-4 border-[#b3b3b6] px-8 py-4 text-center whitespace-nowrap max-[600px]:px-4"
              href="#vehicle-1"
            >
              Model Y L Premium
            </a>
            <a
              className="flex h-14 items-center justify-center border-b-4 border-[#b3b3b6] px-8 py-4 text-center whitespace-nowrap max-[600px]:px-4"
              href="#vehicles"
            >
              Tab 4
            </a>
          </nav>
        </section>

        <section
          className={`flex h-[864px] items-center justify-center overflow-hidden bg-white py-28 ${sectionGutter} max-[1100px]:h-auto max-[1100px]:py-20 max-[600px]:py-16`}
          id="discover"
          aria-labelledby="fsd-title"
        >
          <div className={container}>
            <article className="grid h-[640px] grid-cols-2 overflow-hidden rounded-lg bg-surface max-[1100px]:h-auto max-[1100px]:grid-cols-1">
              <div className="flex h-full flex-col justify-center gap-8 p-12 max-[1100px]:min-h-[590px] max-[600px]:min-h-0 max-[600px]:px-6 max-[600px]:py-8">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <p className="font-semibold leading-6">Tagline</p>
                    <div className="flex flex-col gap-6">
                      <h2 className={heading} id="fsd-title">
                        Full Self-Driving (Supervised)
                      </h2>
                      <p className="text-lg leading-[27px] max-[600px]:text-base max-[600px]:leading-6">
                        Makes every drive easier. Subscribe for $99/mo.1
                      </p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-2 gap-6 py-2 max-[600px]:grid-cols-1">
                    <div className="flex min-w-0 flex-col gap-2">
                      <dt className="text-[52px] leading-[1.2] font-medium tracking-[-0.52px] max-[600px]:text-[40px]">
                        7x
                      </dt>
                      <dd className="leading-6">Fewer Collisions</dd>
                    </div>
                    <div className="flex min-w-0 flex-col gap-2">
                      <dt className="[overflow-wrap:anywhere] text-[52px] leading-[1.2] font-medium tracking-[-0.52px] max-[600px]:text-[40px]">
                        14,515,232
                        <br />
                        ,223
                      </dt>
                      <dd className="leading-6">Miles Driven</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex items-center gap-6 max-[600px]:flex-wrap">
                  <a
                    className={`${lightButton} shadow-[0_1px_2px_rgba(3,4,12,0.05),inset_0_0_0_1px_rgba(3,4,12,0.05),inset_0_-2px_1px_rgba(3,4,12,0.05)]`}
                    href="#discover"
                  >
                    Schedule Demo
                  </a>
                  <ChevronLink href="#vehicles">Learn More</ChevronLink>
                </div>
              </div>

              <a
                className="relative block h-full overflow-hidden rounded-lg max-[1100px]:min-h-[620px] max-[600px]:min-h-[380px]"
                href="#fsd-title"
                aria-label="Play Full Self-Driving overview"
              >
                <Image
                  className="object-cover"
                  src="/assets/fsd-video.png"
                  alt=""
                  fill
                  sizes="(max-width: 1100px) 100vw, 50vw"
                />
                <span className="absolute inset-0 bg-black/40" aria-hidden="true" />
                <Image
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="/assets/play-button.svg"
                  alt=""
                  width={64}
                  height={64}
                />
              </a>
            </article>
          </div>
        </section>

        <section
          className={`flex h-[1057px] items-start justify-center overflow-hidden bg-white py-28 ${sectionGutter} max-[1100px]:h-auto max-[1100px]:py-20 max-[600px]:py-16`}
          id="vehicles"
          aria-labelledby="vehicles-title"
        >
          <div className={container}>
            <SectionTitle id="vehicles-title" title="Vehicles Models" />

            <div className="mt-20 max-[1100px]:mt-16 max-[600px]:mt-12" aria-roledescription="carousel" aria-label="Tesla vehicle models">
              <ol className="scrollbar-none smooth-track flex h-[560px] w-[calc(100vw-max(var(--page-gutter),(100vw-1280px)/2))] snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth overscroll-x-contain max-[600px]:h-[480px]">
                {vehicles.map((vehicle) => (
                  <li
                    className="h-[560px] flex-[0_0_405px] scroll-ms-4 snap-start max-[600px]:h-[480px] max-[600px]:basis-[min(82vw,360px)]"
                    id={vehicle.id}
                    key={vehicle.id}
                  >
                    <article className="relative isolate flex h-full w-full items-end overflow-hidden rounded-lg p-8 text-white max-[600px]:p-6">
                      <Image
                        className="-z-20 object-cover"
                        src="/assets/vehicle-card.png"
                        alt=""
                        fill
                        sizes="405px"
                      />
                      <span className="absolute inset-0 -z-10 bg-black/40" aria-hidden="true" />
                      <div className="flex w-full flex-col items-start gap-6 max-[600px]:gap-4">
                        <Image
                          src={vehicle.logo}
                          alt={vehicle.logoAlt}
                          width={120}
                          height={48}
                        />
                        <p className="w-full font-roboto text-lg leading-[27px] max-[600px]:text-base max-[600px]:leading-6">
                          {vehicle.type}
                        </p>
                        <p className="w-full leading-6">
                          <strong className="block w-full font-semibold">{vehicle.name}</strong>
                          <span className="block w-full">{vehicle.offer}</span>
                        </p>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>

              <CarouselControls
                className="mt-8"
                dots="/assets/slider-dots-6.svg"
                dotsAlt="Slide 1 of 6"
                previous="#vehicle-1"
                next="#vehicle-4"
              />
            </div>
          </div>
        </section>

        <section
          className={`flex h-[571px] items-center justify-center overflow-hidden bg-blue-surface py-28 ${sectionGutter} max-[1100px]:h-auto max-[1100px]:py-20 max-[600px]:py-16`}
          aria-labelledby="offers-title"
        >
          <div className={container}>
            <article className="grid h-[347px] grid-cols-2 overflow-hidden rounded-lg bg-blue-card max-[1100px]:h-auto max-[1100px]:grid-cols-1">
              <div className="flex min-w-0 flex-col items-start justify-center gap-8 p-12 max-[1100px]:min-h-[360px] max-[600px]:min-h-0 max-[600px]:px-6 max-[600px]:py-10">
                <div className="flex w-full flex-col gap-6">
                  <h2 className={`${heading} min-h-[124px] max-[600px]:min-h-0`} id="offers-title">
                    Current Offers
                  </h2>
                  <p className="text-lg leading-[27px] max-[600px]:text-base max-[600px]:leading-6">
                    Explore limited-time offers on Tesla vehicles.
                  </p>
                </div>
                <a className={primaryButton} href="#offers-title">
                  Learn More
                </a>
              </div>
              <div className="relative h-full min-w-0 overflow-hidden max-[1100px]:h-[440px] max-[600px]:h-[300px]">
                <Image
                  className="object-cover"
                  src="/assets/current-offers.png"
                  alt="Cybertruck, Model Y and Model 3"
                  fill
                  sizes="(max-width: 1100px) 100vw, 50vw"
                />
              </div>
            </article>
          </div>
        </section>

        <section
          className={`flex h-[598px] items-center justify-center overflow-hidden bg-surface py-28 ${sectionGutter} max-[1100px]:h-auto max-[1100px]:py-20 max-[600px]:py-16`}
          aria-labelledby="inventory-title"
        >
          <div className={container}>
            <article className="grid h-[374px] grid-cols-2 overflow-hidden rounded-lg bg-white max-[1100px]:h-auto max-[1100px]:grid-cols-1">
              <div className="flex min-w-0 flex-col items-start justify-center gap-8 p-12 max-[1100px]:min-h-[360px] max-[600px]:min-h-0 max-[600px]:px-6 max-[600px]:py-10">
                <div className="flex w-full flex-col gap-6">
                  <h2 className={`${heading} min-h-[124px] max-[600px]:min-h-0`} id="inventory-title">
                    Inventory
                  </h2>
                  <p className="text-lg leading-[27px] max-[600px]:text-base max-[600px]:leading-6">
                    Find new and Certified Pre-Owned Tesla vehicles available immediately.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <a className={primaryButton} href="#inventory-title">
                    New
                  </a>
                  <a className={lightButton} href="#inventory-title">
                    Pre-Owned
                  </a>
                </div>
              </div>
              <div className="relative h-full min-w-0 overflow-hidden max-[1100px]:h-[440px] max-[600px]:h-[300px]">
                <Image
                  className="object-cover"
                  src="/assets/inventory.png"
                  alt="Tesla vehicles available in inventory"
                  fill
                  sizes="(max-width: 1100px) 100vw, 50vw"
                />
              </div>
            </article>
          </div>
        </section>

        <section
          className="h-[1206px] overflow-hidden bg-blue-surface max-[1100px]:h-auto"
          aria-label="Tesla charging network map"
        >
          <div className="h-[396px] max-[1100px]:h-[280px] max-[600px]:h-[180px]" />
          <div className="relative h-[810px] max-[1100px]:h-[min(70vw,680px)] max-[600px]:h-[66vw] max-[600px]:min-h-[300px]">
            <Image
              className="object-cover"
              src="/assets/charging-map.png"
              alt="Map of Tesla charging locations across North America"
              fill
              sizes="100vw"
            />
          </div>
        </section>

        <section
          className={`flex h-[558px] items-center justify-center overflow-hidden bg-white py-28 ${sectionGutter} max-[1100px]:h-auto max-[1100px]:py-20 max-[600px]:py-16`}
          id="charging"
          aria-labelledby="charging-title"
        >
          <div className={`${container} grid h-[334px] grid-cols-[616px_minmax(0,1fr)] items-center gap-20 max-[1100px]:h-auto max-[1100px]:grid-cols-[1fr_0.85fr] max-[1100px]:gap-12 max-[800px]:grid-cols-1`}>
            <div className="flex w-[616px] flex-col gap-8 max-[1100px]:w-auto">
              <div className="flex flex-col gap-6 pt-16 max-[800px]:pt-0">
                <h2 className={heading} id="charging-title">
                  Find Your Charge
                </h2>
                <p className="text-lg leading-[27px] max-[600px]:text-base max-[600px]:leading-6">
                  View the network of Tesla Superchargers and Destination Chargers available near you.
                </p>
              </div>
              <div className="flex items-center gap-6 max-[600px]:flex-wrap">
                <a className={lightButton} href="#charging">
                  View Network
                </a>
                <ChevronLink href="#charging">Learn More</ChevronLink>
              </div>
            </div>

            <dl className="flex h-[334px] min-w-0 flex-col gap-12 max-[800px]:h-auto max-[800px]:flex-row max-[800px]:gap-6 max-[600px]:flex-col">
              <div className="flex h-[143px] flex-col gap-2 border-l border-black/15 pl-8 max-[800px]:h-auto max-[800px]:w-1/2 max-[600px]:w-full">
                <dt className="h-[104px] font-roboto text-[80px] leading-[1.3] font-bold max-[600px]:h-auto max-[600px]:text-[64px]">
                  428
                </dt>
                <dd className="text-[22px] leading-[31px] font-medium tracking-[-0.22px]">
                  Superchargers
                </dd>
              </div>
              <div className="flex h-[143px] flex-col gap-2 border-l border-black/15 pl-8 max-[800px]:h-auto max-[800px]:w-1/2 max-[600px]:w-full">
                <dt className="h-[104px] font-roboto text-[80px] leading-[1.3] font-bold max-[600px]:h-auto max-[600px]:text-[64px]">
                  26
                </dt>
                <dd className="text-[22px] leading-[31px] font-medium tracking-[-0.22px]">
                  Destination Chargers
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          className={`flex h-[1233px] items-start justify-center overflow-hidden bg-white py-28 ${sectionGutter} max-[1100px]:h-auto max-[1100px]:py-20 max-[600px]:py-16`}
          id="energy"
          aria-labelledby="products-title"
        >
          <div className={container}>
            <SectionTitle id="products-title" title="Other Products" />

            <div className="mt-20 max-[1100px]:mt-16 max-[600px]:mt-12" aria-roledescription="carousel" aria-label="Other Tesla products">
              <ol className="scrollbar-none smooth-track flex h-[720px] w-[calc(100vw-max(var(--page-gutter),(100vw-1280px)/2))] snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth overscroll-x-contain max-[600px]:h-auto">
                {products.map(([id, src, alt]) => (
                  <li
                    className="relative h-[720px] flex-[0_0_1280px] scroll-ms-4 snap-start overflow-hidden rounded-lg max-[1100px]:basis-[calc(100vw-(var(--page-gutter)*2))] max-[600px]:h-auto max-[600px]:aspect-video"
                    id={id}
                    key={id}
                  >
                    <Image className="object-cover" src={src} alt={alt} fill sizes="100vw" />
                  </li>
                ))}
              </ol>

              <CarouselControls
                className="mt-12"
                dots="/assets/slider-dots-3.svg"
                dotsAlt="Slide 1 of 3"
                previous="#product-1"
                next="#product-2"
              />
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`h-[382px] overflow-hidden bg-white py-20 ${sectionGutter} max-[1100px]:h-auto max-[1100px]:py-16`}
        id="shop"
      >
        <div className={`${container} flex h-[222px] flex-col items-center gap-20 max-[1100px]:h-auto max-[1100px]:gap-16`}>
          <div className="flex h-[89px] w-[480px] flex-col items-center gap-8 max-[600px]:h-auto max-[600px]:w-full">
            <a className="flex h-9 w-[84px] items-center justify-center" href="#top" aria-label="Tesla home">
              <Image src="/assets/tesla-logo.svg" alt="Tesla" width={70} height={36} />
            </a>
            <nav aria-label="Footer navigation">
              <ul className="flex items-center gap-8 text-sm leading-[21px] font-semibold whitespace-nowrap max-[600px]:flex-wrap max-[600px]:justify-center max-[600px]:gap-x-6 max-[600px]:gap-y-4">
                {footerLinks.map(([label, href]) => (
                  <li key={href}>
                    <a className="underline-offset-4 hover:underline" href={href}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="grid h-[53px] w-full grid-rows-[1px_21px] gap-y-[31px] max-[800px]:h-auto max-[800px]:grid-rows-[1px_auto]">
            <div className="h-px w-full overflow-hidden" aria-hidden="true">
              <Image className="h-px w-[1280px]" src="/assets/divider.svg" alt="" width={1280} height={1} />
            </div>
            <div className="flex w-full items-start justify-between text-sm leading-[21px] whitespace-nowrap max-[800px]:flex-col max-[800px]:items-center max-[800px]:gap-6">
              <p>Tesla © 2026</p>
              <ul className="flex gap-6 max-[800px]:flex-wrap max-[800px]:justify-center max-[600px]:gap-x-5 max-[600px]:gap-y-3">
                <li>
                  <a className="underline underline-offset-2" id="privacy" href="#privacy">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="underline underline-offset-2" id="terms" href="#terms">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a className="underline underline-offset-2" id="cookies" href="#cookies">
                    Cookies Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
