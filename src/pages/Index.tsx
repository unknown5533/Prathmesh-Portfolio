import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Videos } from "@/components/Videos";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Portfolio />
      <Videos />
      <Contact />
      <footer className="py-8 text-center text-muted-foreground border-t border-border">
        <p>© 2025 Prathmesh Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
