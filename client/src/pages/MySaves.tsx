import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SavedViewCard } from '@/components/SavedViewCard';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useToast } from '@/hooks/use-toast';
import { Telescope } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import moonImage from '@assets/generated_images/Moon_surface_sample_image_a49cb8f7.png';

export default function MySaves() {
  const { toast } = useToast();
  const [savedViews, setSavedViews] = useState([
    {
      id: '1',
      name: 'Tycho Crater Detail',
      thumbnailUrl: moonImage,
      note: 'Interesting ray pattern extending from crater rim showing impact ejecta distribution',
      savedDate: 'Oct 4, 2025',
      zoomLevel: 3.5,
    },
    {
      id: '2',
      name: 'Mare Imbrium Region',
      thumbnailUrl: moonImage,
      note: 'Large basaltic plain with visible wrinkle ridges',
      savedDate: 'Oct 3, 2025',
      zoomLevel: 2.1,
    },
    {
      id: '3',
      name: 'Copernicus Crater',
      thumbnailUrl: moonImage,
      savedDate: 'Oct 2, 2025',
      zoomLevel: 4.2,
    },
  ]);

  const handleView = (id: string) => {
    console.log('View saved item:', id);
    toast({
      title: 'Loading View',
      description: 'Opening saved view in explorer...',
    });
  };

  const handleDelete = (id: string) => {
    setSavedViews(prev => prev.filter(view => view.id !== id));
    toast({
      title: 'View Deleted',
      description: 'The saved view has been removed from your collection.',
      variant: 'destructive',
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold mb-2" data-testid="text-page-title">
                My Saved Views
              </h1>
              <p className="text-muted-foreground" data-testid="text-page-subtitle">
                Your collection of discovered cosmic locations
              </p>
            </div>

            {savedViews.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-saved-views">
                {savedViews.map(view => (
                  <SavedViewCard
                    key={view.id}
                    {...view}
                    onView={handleView}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20" data-testid="empty-state">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Telescope className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">No Saved Views Yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Start exploring the cosmos and save your favorite discoveries to build your collection
                </p>
                <Link href="/explorer">
                  <a data-testid="link-start-exploring">
                    <Button>
                      <Telescope className="mr-2 h-4 w-4" />
                      Start Exploring
                    </Button>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
