import Image from "next/image";
import Link from "next/link";
import Button from "../../components/ui/Button";
import { requireAdmin } from "../../lib/auth/require-admin";
import {
  FOOTER_TEXT_MAX_LENGTH,
  getAdminFooterText
} from "../../lib/footer-settings";
import { createClient } from "../../lib/supabase/server";
import { logout, updateFooterText } from "./actions";

export const metadata = {
  title: "Админ — Tesla"
};

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }) {
  const claims = await requireAdmin();
  const supabase = await createClient();
  const footerText = await getAdminFooterText(supabase);
  const params = await searchParams;
  const footerSaved = params?.status === "footer_saved";
  const hasFooterError =
    params?.error === "invalid_footer_text" ||
    params?.error === "footer_update_failed";

  return (
    <div className="min-h-svh bg-surface">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-[var(--page-gutter)] max-[600px]:h-16">
          <Link
            className="flex h-10 w-[88px] items-center justify-center"
            href="/"
            aria-label="Tesla нүүр хуудас"
          >
            <Image
              src="/assets/tesla-logo.svg"
              alt="Tesla"
              width={72}
              height={36}
              priority
            />
          </Link>

          <form action={logout}>
            <Button size="small" type="submit" variant="outline">
              Гарах
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1280px] gap-8 px-[var(--page-gutter)] py-16 max-[600px]:py-10">
        <section className="w-full rounded-xl border border-black/10 bg-white p-10 shadow-[0_16px_50px_rgba(3,4,12,0.07)] max-[600px]:p-6">
          <div
            className="flex size-12 items-center justify-center rounded-full bg-blue-surface text-2xl text-royal-blue"
            aria-hidden="true"
          >
            ✓
          </div>
          <p className="mt-8 font-semibold text-royal-blue">Админ</p>
          <h1 className="mt-3 text-[44px] leading-[1.15] font-medium tracking-[-0.44px] max-[600px]:text-4xl">
            Амжилттай нэвтэрлээ
          </h1>
          <p className="mt-5 max-w-[640px] text-lg leading-[27px] text-black/65 max-[600px]:text-base max-[600px]:leading-6">
            Нүүр хуудасны удирдлагын тохиргоог эндээс шинэчилнэ.
          </p>

          <dl className="mt-10 grid max-w-[640px] gap-3 rounded-lg bg-surface p-5 sm:grid-cols-[140px_1fr]">
            <dt className="font-semibold">Нэвтэрсэн имэйл</dt>
            <dd className="break-all text-black/70">{claims.email}</dd>
          </dl>
        </section>

        <section className="w-full rounded-xl border border-black/10 bg-white p-10 shadow-[0_16px_50px_rgba(3,4,12,0.07)] max-[600px]:p-6">
          <p className="font-semibold text-royal-blue">Footer тохиргоо</p>
          <h2 className="mt-3 text-[32px] leading-[1.2] font-medium tracking-[-0.32px] max-[600px]:text-3xl">
            Footer текст засах
          </h2>
          <p className="mt-4 max-w-[640px] leading-6 text-black/65">
            Энд хадгалсан текст нүүр хуудасны хамгийн доод хэсэгт харагдана.
          </p>

          {footerSaved ? (
            <p
              className="mt-6 max-w-[640px] rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-5 text-emerald-800"
              role="status"
            >
              Footer текст амжилттай шинэчлэгдлээ.
            </p>
          ) : null}

          {hasFooterError ? (
            <p
              className="mt-6 max-w-[640px] rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800"
              role="alert"
            >
              Footer текстийг хадгалж чадсангүй. 1–{FOOTER_TEXT_MAX_LENGTH}
              тэмдэгттэй текст оруулаад дахин оролдоно уу.
            </p>
          ) : null}

          <form action={updateFooterText} className="mt-8 grid max-w-[640px] gap-5">
            <label className="grid gap-2 font-medium" htmlFor="footerText">
              Footer текст
              <input
                className="h-12 rounded-md border border-black/15 bg-white px-4 font-sans font-normal text-ink outline-none transition-[border-color,box-shadow] focus:border-royal-blue focus:ring-3 focus:ring-[#4259e9]/15"
                id="footerText"
                name="footerText"
                type="text"
                defaultValue={footerText}
                maxLength={FOOTER_TEXT_MAX_LENGTH}
                required
              />
            </label>

            <div className="flex items-center justify-between gap-4 max-[600px]:flex-col max-[600px]:items-stretch">
              <p className="text-sm leading-5 text-black/55">
                Дээд тал нь {FOOTER_TEXT_MAX_LENGTH} тэмдэгт.
              </p>
              <Button type="submit">Хадгалах</Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
