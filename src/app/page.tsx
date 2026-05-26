import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import VettureEvidenza from "@/components/home/VettureEvidenza";
import MetodoBernabei from "@/components/home/MetodoBernabei";
import Recensioni from "@/components/home/Recensioni";
import ChiSiamoTeaser from "@/components/home/ChiSiamoTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <VettureEvidenza />
      <MetodoBernabei />
      <Recensioni />
      <ChiSiamoTeaser />
    </>
  );
}
