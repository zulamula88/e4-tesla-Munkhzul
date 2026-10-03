import Image from "next/image";
import Link from "next/link";
import Button from "../../components/ui/Button";
import { requireAdmin } from "../../lib/auth/require-admin";
import { logout } from "./actions";

export const metadata = {
  title: "Админ — Tesla"
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const claims = await requireAdmin();

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

      <main className="mx-auto flex w-full max-w-[1280px] px-[var(--page-gutter)] py-16 max-[600px]:py-10">
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
            Админ хэсгийн нэвтрэлт бэлэн боллоо. Одоогоор нэмэлт үйлдэл байхгүй;
            дараагийн шатанд шаардлагатай удирдлагын боломжуудыг энд нэмнэ.
          </p>

          <dl className="mt-10 grid max-w-[640px] gap-3 rounded-lg bg-surface p-5 sm:grid-cols-[140px_1fr]">
            <dt className="font-semibold">Нэвтэрсэн имэйл</dt>
            <dd className="break-all text-black/70">{claims.email}</dd>
          </dl>
        </section>
      </main>
    </div>
  );
}
