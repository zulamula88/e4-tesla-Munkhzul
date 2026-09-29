const orderButton = document.querySelector("#order-now-button");
const checkoutStatus = document.querySelector("#checkout-status");

function showCheckoutStatus(message, state = "info") {
  if (!checkoutStatus) return;

  checkoutStatus.textContent = message;
  checkoutStatus.dataset.state = state;
  checkoutStatus.hidden = !message;
}

function showReturnStatus() {
  const checkoutResult = new URLSearchParams(window.location.search).get("checkout");

  if (checkoutResult === "success") {
    showCheckoutStatus(
      "Төлбөр амжилттай. BYL-ээс ирсэн захиалгын баталгаажуулалтаа шалгана уу.",
      "success"
    );
  } else if (checkoutResult === "cancelled") {
    showCheckoutStatus("Төлбөр цуцлагдлаа. Та хүссэн үедээ дахин оролдож болно.", "error");
  }
}

async function createCheckout() {
  if (!orderButton || orderButton.disabled) return;

  const originalLabel = orderButton.textContent;
  orderButton.disabled = true;
  orderButton.textContent = "Redirecting…";
  showCheckoutStatus("BYL төлбөрийн аюулгүй хуудсыг бэлдэж байна…");

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
    showCheckoutStatus(
      error instanceof Error ? error.message : "Checkout үүсгэх үед алдаа гарлаа.",
      "error"
    );
    orderButton.disabled = false;
    orderButton.textContent = originalLabel;
  }
}

orderButton?.addEventListener("click", createCheckout);
showReturnStatus();
