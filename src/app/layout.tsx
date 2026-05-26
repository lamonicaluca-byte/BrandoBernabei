import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Bernabei Automobili | Auto Usate Premium e Sportive a Roma",
  description:
    "Concessionaria specializzata in auto usate di lusso e sportive a Roma. Selezione personale, trasparenza garantita, assistenza post-vendita. 97% recensioni positive su AutoScout24.",
  keywords:
    "auto usate lusso Roma, auto sportive usate Roma, Porsche usata Roma, concessionaria premium Roma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
