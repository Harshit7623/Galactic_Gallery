import { useEffect, useRef, useState } from 'react';
import OpenSeadragon from 'openseadragon';
import { Button } from '@/components/ui/button';
import { Save, Download, Pencil, MapPin } from 'lucide-react';
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

interface ImageViewerProps {
  imageUrl: string;
  imageName?: string;
}

export function ImageViewer({ imageUrl, imageName = 'Space Image' }: ImageViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const osdViewerRef = useRef<OpenSeadragon.Viewer | null>(null);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
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

  return (
    <div className="relative h-full w-full">
      <div ref={viewerRef} className="h-full w-full bg-black" data-testid="viewer-container" />
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 rounded-md border bg-card/80 backdrop-blur-lg p-2 shadow-lg">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowSaveDialog(true)}
            data-testid="button-save-view"
          >
            <Save className="mr-2 h-4 w-4" />
            Save View
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDownload}
            data-testid="button-download"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button
            size="sm"
            variant={isAnnotating ? 'secondary' : 'ghost'}
            onClick={toggleAnnotation}
            data-testid="button-annotate"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Annotate
          </Button>
          <Button
            size="sm"
            variant="ghost"
            data-testid="button-add-marker"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Add Marker
          </Button>
        </div>
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
