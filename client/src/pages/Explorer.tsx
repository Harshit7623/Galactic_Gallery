import { Navbar } from '@/components/Navbar';
import { ImageViewer } from '@/components/ImageViewer';
import moonImage from '@assets/generated_images/Moon_surface_sample_image_a49cb8f7.png';

export default function Explorer() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <ImageViewer imageUrl={moonImage} imageName="Lunar Surface" />
      </main>
    </div>
  );
}
