import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "../../../components/ui/Button";
import { getAdminEmail, isAdminClaims } from "../../../lib/auth/admin";
import { createClient } from "../../../lib/supabase/server";
import { login } from "../actions";

export const metadata = {
  title: "Админ нэвтрэх — Tesla"
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (isAdminClaims(data?.claims)) {
    redirect("/admin");
  }

  const params = await searchParams;
  const hasError = params?.error === "invalid_credentials";
  const signedOut = params?.status === "signed_out";

  return (
    <main className="flex min-h-svh items-center justify-center bg-surface px-[var(--page-gutter)] py-12">
      <section className="w-full max-w-[440px] rounded-xl border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(3,4,12,0.10)] max-[600px]:p-6">
        <Link
          className="mx-auto flex h-11 w-[92px] items-center justify-center"
          href="/"
          aria-label="Tesla нүүр хуудас"
        >
          <Image
            src="/assets/tesla-logo.svg"
            alt="Tesla"
            width={78}
            height={40}
            priority
          />
        </Link>

        <header className="mt-8 text-center">
          <p className="font-semibold text-royal-blue">Удирдлагын хэсэг</p>
          <h1 className="mt-3 text-[36px] leading-[1.15] font-medium tracking-[-0.36px]">
            Админ нэвтрэх
          </h1>
          <p className="mt-4 leading-6 text-black/65">
            Үргэлжлүүлэхийн тулд Supabase хэрэглэгчийн нууц үгээ оруулна уу.
          </p>
        </header>

        {hasError ? (
          <p
            className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800"
            role="alert"
          >
            Имэйл эсвэл нууц үг буруу байна. Дахин шалгаад оролдоно уу.
          </p>
        ) : null}

        {signedOut ? (
          <p
            className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-5 text-emerald-800"
            role="status"
          >
            Та системээс амжилттай гарлаа.
          </p>
        ) : null}

        <form action={login} className="mt-8 grid gap-5">
          <label className="grid gap-2 font-medium" htmlFor="email">
            Имэйл
            <input
              className="h-12 rounded-md border border-black/15 bg-black/[0.025] px-4 font-sans font-normal text-ink outline-none transition-[border-color,box-shadow] focus:border-royal-blue focus:ring-3 focus:ring-[#4259e9]/15"
              id="email"
              name="email"
              type="email"
              value={getAdminEmail()}
              autoComplete="username"
              readOnly
            />
          </label>

          <label className="grid gap-2 font-medium" htmlFor="password">
            Нууц үг
            <input
              className="h-12 rounded-md border border-black/15 bg-white px-4 font-sans font-normal text-ink outline-none transition-[border-color,box-shadow] focus:border-royal-blue focus:ring-3 focus:ring-[#4259e9]/15"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              required
            />
          </label>

          <Button className="mt-1 w-full" type="submit">
            Нэвтрэх
          </Button>
        </form>

        <Link
          className="mt-6 flex min-h-10 items-center justify-center rounded-md font-medium underline-offset-4 hover:underline"
          href="/"
        >
          Нүүр хуудас руу буцах
        </Link>
      </section>
    </main>
  );
}
