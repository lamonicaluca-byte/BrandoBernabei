import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti | Bernabei Automobili Roma",
  description:
    "Contatta Bernabei Automobili a Roma. Via Flaminia, 318/a, 00196 Roma. Tel: +39 339 502 7983. Disponibili su WhatsApp.",
};

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
