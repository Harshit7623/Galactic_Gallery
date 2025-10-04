import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Database, Telescope, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6" data-testid="text-page-title">
            About Galactic Gallery
          </h1>
          
          <div className="prose prose-lg dark:prose-invert mb-12">
            <p className="text-lg text-muted-foreground" data-testid="text-intro">
              Galactic Gallery is an interactive space exploration portal that brings NASA's stunning
              planetary and lunar imagery to your fingertips. Using advanced zoomable image technology,
              we enable you to explore celestial bodies in unprecedented detail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card data-testid="card-mission">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Telescope className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
                <p className="text-muted-foreground">
                  We believe that everyone should have access to explore the cosmos. Our platform makes
                  NASA's high-resolution space imagery accessible and interactive for researchers,
                  educators, and space enthusiasts worldwide.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-technology">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-3">Technology</h2>
                <p className="text-muted-foreground">
                  Built with OpenSeadragon for smooth, high-performance image viewing. Our platform
                  supports infinite zoom capabilities, allowing you to dive deep into the surface
                  details of moons, planets, and other celestial objects.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12" data-testid="card-nasa-data">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">NASA Data Usage</h2>
                  <p className="text-muted-foreground mb-4">
                    All imagery and data provided through this platform comes from NASA's public
                    archives and APIs. We utilize various NASA data sources including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Lunar Reconnaissance Orbiter (LRO) imagery</li>
                    <li>Mars Reconnaissance Orbiter (MRO) high-resolution photography</li>
                    <li>Cassini mission Saturn and moon imagery</li>
                    <li>Hubble Space Telescope observations</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    NASA's open data policy makes this exploration possible. We are grateful for
                    their commitment to public access and scientific transparency.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold mb-4">Features</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">Save Your Views</h3>
                <p className="text-sm text-muted-foreground">
                  Bookmark specific locations with zoom level and position preserved
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Annotate & Mark</h3>
                <p className="text-sm text-muted-foreground">
                  Draw regions and add notes to document your observations
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Download Sections</h3>
                <p className="text-sm text-muted-foreground">
                  Export high-quality images of your explored regions
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
