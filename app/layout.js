import "./globals.css";

export const metadata = {
  title: "Tesla — Model Y",
  description:
    "Explore Tesla vehicles, charging, offers, inventory, and energy products.",
  icons: {
    icon: "/assets/tesla-logo.svg"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
