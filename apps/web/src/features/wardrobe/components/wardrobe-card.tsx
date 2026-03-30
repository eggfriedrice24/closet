import { Badge } from "@workspace/ui/components/badge";
import { Card } from "@workspace/ui/components/card";

type WardrobeCardProps = {
  item: {
    id: string;
    name: string;
    imageUrl: string;
    category: string;
    color: string | null;
    style: string | null;
    season: string[] | null;
  };
  onClick: () => void;
};

export function WardrobeCard({ item, onClick }: WardrobeCardProps) {
  return (
    <Card
      className="cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        <p className="text-sm leading-tight font-medium">{item.name}</p>
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary">{item.category}</Badge>
          {item.color && <Badge variant="outline">{item.color}</Badge>}
        </div>
      </div>
    </Card>
  );
}
