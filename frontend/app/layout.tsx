import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const nexa = localFont({
  src: [
    { path: "../public/fonts/nexa-light.ttf",        weight: "300", style: "normal" },
    { path: "../public/fonts/nexa-light-italic.ttf", weight: "300", style: "italic" },
    { path: "../public/fonts/nexa-regular.ttf",      weight: "400", style: "normal" },
    { path: "../public/fonts/nexa-bold.ttf",         weight: "700", style: "normal" },
    { path: "../public/fonts/nexa-bold-italic.ttf",  weight: "700", style: "italic" },
    { path: "../public/fonts/nexa-heavy.ttf",        weight: "800", style: "normal" },
    { path: "../public/fonts/nexa-heavy-italic.ttf", weight: "800", style: "italic" },
    { path: "../public/fonts/nexa-black.ttf",        weight: "900", style: "normal" },
    { path: "../public/fonts/nexa-black-italic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-nexa-src",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Qualitas Eco Paint — Transform Your Space",
  description:
    "Premium sustainable paints that care for your home and our planet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nexa.variable}>
      <body>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}