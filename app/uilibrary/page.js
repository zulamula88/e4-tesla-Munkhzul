import Image from "next/image";
import Button from "../../components/ui/Button";

export const metadata = {
  title: "UI Library — Tesla Model Y",
  description: "Reusable UI components used by the Tesla Model Y website."
};

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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

function ArrowLeft() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.833 10H4.166M9.166 5l-5 5 5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-80" d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Showcase({ title, description, children }) {
  return (
    <section className="grid gap-8 border-t border-black/15 py-12 first:border-t-0 max-[700px]:gap-6 max-[700px]:py-10 lg:grid-cols-[280px_1fr]">
      <div>
        <h2 className="text-2xl leading-tight font-medium tracking-[-0.24px]">{title}</h2>
        <p className="mt-3 max-w-[420px] text-sm leading-6 text-black/60">{description}</p>
      </div>
      <div className="rounded-xl border border-black/10 bg-white p-8 shadow-[0_1px_2px_rgba(3,4,12,0.04)] max-[600px]:p-6">
        {children}
      </div>
    </section>
  );
}

function Example({ label, children }) {
  return (
    <div className="flex min-w-[180px] flex-col items-start gap-3">
      <span className="text-xs font-semibold tracking-[0.08em] text-black/45 uppercase">{label}</span>
      {children}
    </div>
  );
}

export default function UiLibraryPage() {
  return (
    <main className="min-h-screen bg-surface text-ink">
      <header className="border-b border-black/10 bg-white px-[var(--page-gutter)]">
        <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between max-[600px]:h-16">
          <a className="flex h-9 w-[84px] items-center justify-center" href="/" aria-label="Tesla home">
            <Image src="/assets/tesla-logo.svg" alt="Tesla" width={70} height={36} priority />
          </a>
          <Button href="/" size="small" variant="secondary">
            <ArrowLeft />
            Back to website
          </Button>
        </div>
      </header>

      <div className="px-[var(--page-gutter)]">
        <div className="mx-auto w-full max-w-[1280px]">
          <header className="py-20 max-[700px]:py-14">
            <p className="text-sm font-semibold tracking-[0.12em] text-royal-blue uppercase">UI Library</p>
            <h1 className="mt-4 text-[64px] leading-[1.08] font-medium tracking-[-0.64px] max-[600px]:text-5xl max-[600px]:tracking-[-0.48px]">
              Buttons
            </h1>
            <p className="mt-6 max-w-[640px] text-lg leading-7 text-black/60 max-[600px]:text-base max-[600px]:leading-6">
              Сайтын үндсэн үйлдэл, туслах үйлдэл болон navigation-д ашиглагдах товчлууруудын загвар.
            </p>
          </header>

          <Showcase
            title="Variants"
            description="Үйлдлийн ач холбогдлоос хамаарч primary, secondary, outline болон text төрлийг сонгоно."
          >
            <div className="flex flex-wrap gap-x-8 gap-y-10">
              <Example label="Primary">
                <Button>Order Now</Button>
              </Example>
              <Example label="Secondary">
                <Button variant="secondary">Learn More</Button>
              </Example>
              <Example label="Outline">
                <Button variant="outline">Schedule Demo</Button>
              </Example>
              <Example label="Text">
                <Button variant="text">
                  Learn More
                  <ArrowRight />
                </Button>
              </Example>
            </div>
          </Showcase>

          <Showcase
            title="Sizes"
            description="Navigation болон агуулгын hierarchy-д тохирсон гурван хэмжээтэй."
          >
            <div className="flex flex-wrap items-end gap-x-8 gap-y-10">
              <Example label="Small · 40px">
                <Button size="small">Test Drive</Button>
              </Example>
              <Example label="Medium · 44px">
                <Button>Order Now</Button>
              </Example>
              <Example label="Large · 48px">
                <Button size="large">View Inventory</Button>
              </Example>
              <Example label="Icon · 48px">
                <div className="flex gap-3">
                  <Button size="icon" variant="secondary" aria-label="Previous">
                    <ArrowLeft />
                  </Button>
                  <Button size="icon" variant="secondary" aria-label="Next">
                    <ArrowRight />
                  </Button>
                </div>
              </Example>
            </div>
          </Showcase>

          <Showcase
            title="With icons"
            description="Сум болон status icon нь үйлдлийн чиглэл, төлөвийг илүү хурдан ойлгуулна."
          >
            <div className="flex flex-wrap gap-x-8 gap-y-10">
              <Example label="Trailing icon">
                <Button>
                  Continue
                  <ArrowRight />
                </Button>
              </Example>
              <Example label="Leading icon">
                <Button variant="outline">
                  <ArrowLeft />
                  Go Back
                </Button>
              </Example>
              <Example label="Loading">
                <Button aria-busy="true">
                  <Spinner />
                  Redirecting…
                </Button>
              </Example>
            </div>
          </Showcase>

          <Showcase
            title="Disabled"
            description="Үйлдэл түр боломжгүй үед товчийг disabled төлөвөөр харуулна."
          >
            <div className="flex flex-wrap gap-x-8 gap-y-10">
              <Example label="Primary disabled">
                <Button disabled>Order Now</Button>
              </Example>
              <Example label="Secondary disabled">
                <Button disabled variant="secondary">
                  Learn More
                </Button>
              </Example>
              <Example label="Outline disabled">
                <Button disabled variant="outline">
                  Schedule Demo
                </Button>
              </Example>
            </div>
          </Showcase>

          <footer className="flex items-center justify-between gap-6 border-t border-black/15 py-10 text-sm text-black/50 max-[600px]:flex-col max-[600px]:items-start">
            <p>Tesla UI Library · Buttons</p>
            <p>Next.js + Tailwind CSS</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
