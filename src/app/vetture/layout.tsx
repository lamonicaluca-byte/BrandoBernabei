import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vetture disponibili | Bernabei Automobili Roma",
  description:
    "Scopri tutte le vetture premium e sportive disponibili da Bernabei Automobili Roma. Selezione personale, garanzia inclusa, consegna in tutta Italia.",
};

export default function VettureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
