import SiteHeader from "./SiteHeader";

export default function EmptyMenuPage({ title }) {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[calc(100svh-72px)] items-center justify-center bg-white px-[var(--page-gutter)] max-[600px]:min-h-[calc(100svh-64px)]">
        <h1 className="text-center text-[64px] leading-[1.1] font-medium tracking-[-0.64px] text-ink max-[600px]:text-5xl max-[600px]:tracking-[-0.48px]">
          {title}
        </h1>
      </main>
    </>
  );
}
