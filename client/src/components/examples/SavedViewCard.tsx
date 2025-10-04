import { SavedViewCard } from '../SavedViewCard';
import { ThemeProvider } from '@/contexts/ThemeContext';
import moonImage from '@assets/generated_images/Moon_surface_sample_image_a49cb8f7.png';

export default function SavedViewCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-sm">
        <SavedViewCard
          id="1"
          name="Tycho Crater Detail"
          thumbnailUrl={moonImage}
          note="Interesting ray pattern extending from crater rim"
          savedDate="Oct 4, 2025"
          zoomLevel={3.5}
          onView={(id) => console.log('View clicked:', id)}
          onDelete={(id) => console.log('Delete clicked:', id)}
        />
      </div>
    </ThemeProvider>
  );
}
