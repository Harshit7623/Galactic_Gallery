import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChevronDown, Telescope, Save, Pencil, Zap } from 'lucide-react';
import heroImage from '@assets/generated_images/Space_nebula_hero_background_8cf15a78.png';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Deep space nebula"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          <div className="stars-container" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent leading-tight" data-testid="text-hero-title">
            Embiggen Your Eyes
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
            Dive deep into the cosmos through NASA's high-resolution imagery — explore celestial bodies like never before
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/explorer">
              <a data-testid="link-start-exploring">
                <Button size="lg" className="text-lg px-8">
                  <Telescope className="mr-2 h-5 w-5" />
                  Start Exploring
                </Button>
              </a>
            </Link>
            <Link href="/about">
              <a data-testid="link-learn-more">
                <Button size="lg" variant="outline" className="text-lg px-8 backdrop-blur-md bg-background/20">
                  Learn More
                </Button>
              </a>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-primary" />
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Everything you need to explore and document your cosmic discoveries
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4" data-testid="feature-zoom">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Infinite Zoom</h3>
              <p className="text-muted-foreground">
                Explore high-resolution NASA imagery with our advanced OpenSeadragon viewer
              </p>
            </div>
            <div className="text-center space-y-4" data-testid="feature-save">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Save className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Save Views</h3>
              <p className="text-muted-foreground">
                Bookmark your favorite discoveries with precise zoom levels and positions
              </p>
            </div>
            <div className="text-center space-y-4" data-testid="feature-annotate">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Pencil className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Annotate</h3>
              <p className="text-muted-foreground">
                Add notes and markers to document your observations and findings
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to Explore?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create an account to save your discoveries and build your own collection of cosmic views
          </p>
          <Link href="/register">
            <a data-testid="link-get-started">
              <Button size="lg" className="text-lg px-8">
                Get Started Free
              </Button>
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
