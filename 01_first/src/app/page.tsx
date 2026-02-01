import FeaturedCourses from "@/components/FeaturedCourses";
import HeroSection from "@/components/HeroSection";
import TestimonialCard from "@/components/TestimonialCard";
import UpComingWebnire from "@/components/UpComingWebnire";
import WhyChoiceUs from "@/components/WhyChoiceUs";
import Instructores from "@/components/Instructores";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      {/* <h1 className="text-4xl font-bold text-center">Hello, Next.js!</h1> */}
      <HeroSection />
      <FeaturedCourses/>
      <WhyChoiceUs/>
      <TestimonialCard/>
      <UpComingWebnire />
      <Instructores/>
      <Footer />
    </main>
  );
}
