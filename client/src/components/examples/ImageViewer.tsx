import { ImageViewer } from '../ImageViewer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import moonImage from '@assets/generated_images/Moon_surface_sample_image_a49cb8f7.png';

export default function ImageViewerExample() {
  return (
    <ThemeProvider>
      <div className="h-screen w-full">
        <ImageViewer imageUrl={moonImage} imageName="Moon Surface" />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
