import { Hero } from "@/components/home/Hero";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Categories } from "@/components/home/Categories";
import { StatsSection } from "@/components/home/StatsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularDestinations />
      <HowItWorks />
      <Categories />
      <StatsSection />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer></Footer>
    </>
  );
}