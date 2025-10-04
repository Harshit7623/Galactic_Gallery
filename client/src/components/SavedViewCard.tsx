import { Calendar, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SavedViewCardProps {
  id: string;
  name: string;
  thumbnailUrl: string;
  note?: string;
  savedDate: string;
  zoomLevel: number;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SavedViewCard({
  id,
  name,
  thumbnailUrl,
  note,
  savedDate,
  zoomLevel,
  onView,
  onDelete,
}: SavedViewCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-saved-view-${id}`}>
      <div className="aspect-video relative overflow-hidden bg-muted">
        <img
          src={thumbnailUrl}
          alt={name}
          className="w-full h-full object-cover"
          data-testid={`img-thumbnail-${id}`}
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="backdrop-blur-sm">
            {zoomLevel.toFixed(1)}x
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2" data-testid={`text-name-${id}`}>{name}</h3>
        {note && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3" data-testid={`text-note-${id}`}>
            {note}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span data-testid={`text-date-${id}`}>{savedDate}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="flex-1"
          onClick={() => onView(id)}
          data-testid={`button-view-${id}`}
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(id)}
          data-testid={`button-delete-${id}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
