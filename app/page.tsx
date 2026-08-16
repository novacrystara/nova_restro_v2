import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Talk from "@/components/sections/Talk";
import Outlets from "@/components/sections/Outlets";
import Floor from "@/components/sections/Floor";
import Waiters from "@/components/sections/Waiters";
import System from "@/components/sections/System";
import Story from "@/components/sections/Story";
import PositionBand from "@/components/sections/PositionBand";
import Customers from "@/components/sections/Customers";
import Features from "@/components/sections/Features";
import Ways from "@/components/sections/Ways";
import Manifesto from "@/components/sections/Manifesto";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Talk />
        <Outlets />
        <Floor />
        <Waiters />
        <System />
        <Story />
        <PositionBand />
        <Customers />
        <Features />
        <Ways />
        <Manifesto />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
