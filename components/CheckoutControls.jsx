"use client";

import { useEffect, useState } from "react";

const buttonBase =
  "motion-control tap-transparent inline-flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-md border-0 px-6 py-2.5 font-sans font-medium leading-6 shadow-[0_1px_2px_rgba(3,4,12,0.05),inset_0_-2px_1px_rgba(3,4,12,0.05)] transition-[transform,box-shadow,background-color] duration-160 hover:-translate-y-px active:translate-y-0";

const primaryButton = `${buttonBase} bg-royal-blue text-white shadow-[0_1px_1px_rgba(3,4,12,0.05),inset_0_32px_24px_rgba(255,255,255,0.05),inset_0_2px_1px_rgba(255,255,255,0.25),inset_0_-2px_1px_rgba(0,0,0,0.2)] hover:bg-[#354bdb] disabled:cursor-wait disabled:opacity-72 disabled:hover:translate-y-0`;

export default function CheckoutControls() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const checkoutResult = new URLSearchParams(window.location.search).get("checkout");

    if (checkoutResult === "success") {
      setStatus({
        state: "success",
        message:
          "Төлбөр амжилттай. BYL-ээс ирсэн захиалгын баталгаажуулалтаа шалгана уу."
      });
    } else if (checkoutResult === "cancelled") {
      setStatus({
        state: "error",
        message: "Төлбөр цуцлагдлаа. Та хүссэн үедээ дахин оролдож болно."
      });
    }
  }, []);

  async function createCheckout() {
    if (isLoading) return;

    setIsLoading(true);
    setStatus({
      state: "info",
      message: "BYL төлбөрийн аюулгүй хуудсыг бэлдэж байна…"
    });

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Checkout үүсгэж чадсангүй.");
      }

      const checkoutUrl = new URL(result.url);
      if (checkoutUrl.protocol !== "https:" || checkoutUrl.hostname !== "byl.mn") {
        throw new Error("Төлбөрийн хуудасны хаяг буруу байна.");
      }

      window.location.assign(checkoutUrl.href);
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Checkout үүсгэх үед алдаа гарлаа."
      });
      setIsLoading(false);
    }
  }

  const statusColor =
    status?.state === "success"
      ? "bg-[rgba(25,101,52,0.86)]"
      : status?.state === "error"
        ? "bg-[rgba(160,30,45,0.88)]"
        : "bg-[rgba(3,4,12,0.68)]";

  return (
    <>
      <div className="flex items-start gap-4">
        <button
          className={primaryButton}
          type="button"
          aria-describedby="checkout-status"
          disabled={isLoading}
          onClick={createCheckout}
        >
          {isLoading ? "Redirecting…" : "Order Now"}
        </button>
        <a
          className={`${buttonBase} bg-black/5 text-ink`}
          href="#vehicles"
        >
          Learn More
        </a>
      </div>

      {status ? (
        <p
          className={`max-w-[560px] rounded-md px-3.5 py-2.5 text-sm leading-5 text-white backdrop-blur-lg ${statusColor}`}
          id="checkout-status"
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      ) : (
        <p id="checkout-status" className="sr-only" aria-live="polite" />
      )}
    </>
  );
}
