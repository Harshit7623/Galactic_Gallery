import { useEffect, useRef, useState } from 'react';
import OpenSeadragon from 'openseadragon';
import { Button } from '@/components/ui/button';
import { Save, Download, Pencil, MapPin, Maximize2, Minimize2, X } from 'lucide-react';
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

interface ImageViewerProps {
  imageUrl: string;
  imageName?: string;
}

export function ImageViewer({ imageUrl, imageName = 'Space Image' }: ImageViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const osdViewerRef = useRef<OpenSeadragon.Viewer | null>(null);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saveNote, setSaveNote] = useState('');
  const { toast } = useToast();

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative h-full w-full flex">
      <div 
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'w-0' : 'w-80'
        } flex-shrink-0`}
      >
        <Card className={`h-full rounded-none border-r border-l-0 border-t-0 border-b-0 ${isSidebarCollapsed ? 'hidden' : ''}`}>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Tools</CardTitle>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsSidebarCollapsed(true)}
                data-testid="button-collapse-sidebar"
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
                  {isFullscreen ? (
                    <><Minimize2 className="mr-2 h-4 w-4" /> Exit Fullscreen</>
                  ) : (
                    <><Maximize2 className="mr-2 h-4 w-4" /> Enter Fullscreen</>
                  )}
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
                  {isAnnotating ? 'Drawing Mode: ON' : 'Enable Drawing'}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full justify-start"
                  data-testid="button-add-marker"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Add Location Marker
                </Button>
              </div>
            </div>

            <Separator />

            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2">Current Image</p>
              <p className="text-sm font-medium">{imageName}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {isSidebarCollapsed && (
        <Button
          size="sm"
          variant="secondary"
          className="absolute left-2 top-2 z-20"
          onClick={() => setIsSidebarCollapsed(false)}
          data-testid="button-expand-sidebar"
        >
          Tools
        </Button>
      )}

      <div className="flex-1 relative">
        <div ref={viewerRef} className="h-full w-full bg-black" data-testid="viewer-container" />
      </div>

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
