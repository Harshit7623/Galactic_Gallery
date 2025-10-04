import { useEffect, useRef, useState } from 'react';
import OpenSeadragon from 'openseadragon';
import { Button } from '@/components/ui/button';
import { Save, Download, Pencil, MapPin, Maximize2, Minimize2, X, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import moonImage from '@assets/generated_images/Moon_surface_sample_image_a49cb8f7.png';

interface ImageViewerProps {
  imageUrl: string;
  imageName?: string;
}

interface GalleryImage {
  id: string;
  name: string;
  thumbnailUrl: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { id: '1', name: 'Lunar Surface - Tycho Region', thumbnailUrl: moonImage, category: 'Moon' },
  { id: '2', name: 'Mare Imbrium Basin', thumbnailUrl: moonImage, category: 'Moon' },
  { id: '3', name: 'Copernicus Crater', thumbnailUrl: moonImage, category: 'Moon' },
  { id: '4', name: 'Apollo 11 Landing Site', thumbnailUrl: moonImage, category: 'Moon' },
  { id: '5', name: 'South Pole Region', thumbnailUrl: moonImage, category: 'Moon' },
  { id: '6', name: 'Oceanus Procellarum', thumbnailUrl: moonImage, category: 'Moon' },
];

export function ImageViewer({ imageUrl, imageName = 'Space Image' }: ImageViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const osdViewerRef = useRef<OpenSeadragon.Viewer | null>(null);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(imageName);
  const [saveName, setSaveName] = useState('');
  const [saveNote, setSaveNote] = useState('');
  const { toast } = useToast();

  const filteredImages = galleryImages.filter(img =>
    img.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (viewerRef.current && !osdViewerRef.current) {
      osdViewerRef.current = OpenSeadragon({
        element: viewerRef.current,
        prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@3.1/build/openseadragon/images/',
        tileSources: {
          type: 'image',
          url: imageUrl,
        },
        showNavigationControl: true,
        navigationControlAnchor: OpenSeadragon.ControlAnchor.TOP_LEFT,
        showFullPageControl: false,
        animationTime: 0.5,
        minZoomLevel: 0.5,
        maxZoomLevel: 10,
      });
    }

    return () => {
      if (osdViewerRef.current) {
        osdViewerRef.current.destroy();
        osdViewerRef.current = null;
      }
    };
  }, [imageUrl]);

  const handleSaveView = () => {
    if (osdViewerRef.current) {
      const viewport = osdViewerRef.current.viewport;
      const zoom = viewport.getZoom();
      const center = viewport.getCenter();
      console.log('Saving view:', { zoom, center, name: saveName, note: saveNote });
      
      toast({
        title: 'View Saved',
        description: `${saveName || 'Unnamed view'} has been saved to your collection.`,
      });
      
      setShowSaveDialog(false);
      setSaveName('');
      setSaveNote('');
    }
  };

  const handleDownload = () => {
    console.log('Download triggered');
    toast({
      title: 'Download Started',
      description: 'Your image section is being prepared for download.',
    });
  };

  const toggleAnnotation = () => {
    setIsAnnotating(!isAnnotating);
    console.log('Annotation mode:', !isAnnotating);
    toast({
      title: isAnnotating ? 'Annotation Mode Off' : 'Annotation Mode On',
      description: isAnnotating ? 'Annotations disabled' : 'Click on the image to add annotations',
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleImageSelect = (image: GalleryImage) => {
    setSelectedImage(image.name);
    console.log('Selected image:', image.name);
    toast({
      title: 'Image Loaded',
      description: `Now viewing ${image.name}`,
    });
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative h-full w-full flex">
      {/* Left Sidebar - Tools */}
      {!isFullscreen && (
        <div 
          className={`transition-all duration-300 ${
            isLeftSidebarCollapsed ? 'w-0' : 'w-72'
          } flex-shrink-0`}
        >
          <Card className={`h-full rounded-none border-r border-l-0 border-t-0 border-b-0 ${isLeftSidebarCollapsed ? 'hidden' : ''}`}>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Tools</CardTitle>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsLeftSidebarCollapsed(true)}
                  data-testid="button-collapse-left-sidebar"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">VIEW</h3>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full justify-start"
                    onClick={toggleFullscreen}
                    data-testid="button-fullscreen"
                  >
                    <Maximize2 className="mr-2 h-4 w-4" />
                    Enter Fullscreen
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">ACTIONS</h3>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full justify-start"
                    onClick={() => setShowSaveDialog(true)}
                    data-testid="button-save-view"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Current View
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full justify-start"
                    onClick={handleDownload}
                    data-testid="button-download"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Section
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">ANNOTATIONS</h3>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant={isAnnotating ? 'default' : 'secondary'}
                    className="w-full justify-start"
                    onClick={toggleAnnotation}
                    data-testid="button-annotate"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    {isAnnotating ? 'Drawing: ON' : 'Enable Drawing'}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full justify-start"
                    data-testid="button-add-marker"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Add Marker
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-2">Current Image</p>
                <p className="text-sm font-medium">{selectedImage}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isLeftSidebarCollapsed && !isFullscreen && (
        <Button
          size="sm"
          variant="secondary"
          className="absolute left-2 top-2 z-20"
          onClick={() => setIsLeftSidebarCollapsed(false)}
          data-testid="button-expand-left-sidebar"
        >
          Tools
        </Button>
      )}

      {/* Main Viewer */}
      <div className="flex-1 relative">
        <div ref={viewerRef} className="h-full w-full bg-black" data-testid="viewer-container" />
        
        {/* Fullscreen Horizontal Toolbar */}
        {isFullscreen && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 rounded-lg border bg-card/90 backdrop-blur-lg p-3 shadow-xl">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleFullscreen}
                data-testid="button-exit-fullscreen"
                title="Exit Fullscreen"
              >
                <Minimize2 className="h-5 w-5" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button
                size="icon"
                variant={isAnnotating ? 'default' : 'ghost'}
                onClick={toggleAnnotation}
                data-testid="button-annotate-fullscreen"
                title="Toggle Drawing"
              >
                <Pencil className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                data-testid="button-marker-fullscreen"
                title="Add Marker"
              >
                <MapPin className="h-5 w-5" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowSaveDialog(true)}
                data-testid="button-save-fullscreen"
                title="Save View"
              >
                <Save className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDownload}
                data-testid="button-download-fullscreen"
                title="Download"
              >
                <Download className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Image Gallery */}
      {!isFullscreen && (
        <div 
          className={`transition-all duration-300 ${
            isRightSidebarCollapsed ? 'w-0' : 'w-80'
          } flex-shrink-0`}
        >
          <Card className={`h-full rounded-none border-l border-r-0 border-t-0 border-b-0 ${isRightSidebarCollapsed ? 'hidden' : ''}`}>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Image Gallery</CardTitle>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsRightSidebarCollapsed(true)}
                  data-testid="button-collapse-right-sidebar"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="pt-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    data-testid="input-search-images"
                  />
                </div>
              </div>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-180px)]">
              <CardContent className="p-3 space-y-2">
                {filteredImages.map(image => (
                  <button
                    key={image.id}
                    onClick={() => handleImageSelect(image)}
                    className={`w-full text-left rounded-lg border overflow-hidden hover-elevate active-elevate-2 transition-all ${
                      selectedImage === image.name ? 'ring-2 ring-primary' : ''
                    }`}
                    data-testid={`button-gallery-image-${image.id}`}
                  >
                    <div className="aspect-video relative bg-muted">
                      <img
                        src={image.thumbnailUrl}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium line-clamp-2">{image.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{image.category}</p>
                    </div>
                  </button>
                ))}
                {filteredImages.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-sm text-muted-foreground">No images found</p>
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      )}

      {isRightSidebarCollapsed && !isFullscreen && (
        <Button
          size="sm"
          variant="secondary"
          className="absolute right-2 top-2 z-20"
          onClick={() => setIsRightSidebarCollapsed(false)}
          data-testid="button-expand-right-sidebar"
        >
          Gallery
        </Button>
      )}

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent data-testid="dialog-save-view">
          <DialogHeader>
            <DialogTitle>Save Current View</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="save-name">View Name</Label>
              <Input
                id="save-name"
                placeholder="e.g., Tycho Crater Detail"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                data-testid="input-save-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="save-note">Notes (Optional)</Label>
              <Textarea
                id="save-note"
                placeholder="Add any observations or notes..."
                value={saveNote}
                onChange={(e) => setSaveNote(e.target.value)}
                data-testid="input-save-note"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowSaveDialog(false)} data-testid="button-cancel-save">
              Cancel
            </Button>
            <Button onClick={handleSaveView} data-testid="button-confirm-save">
              Save View
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
