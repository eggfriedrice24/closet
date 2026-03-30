import { WardrobeCard } from "./wardrobe-card";

type WardrobeItem = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  color: string | null;
  style: string | null;
  season: string[] | null;
};

type WardrobeGridProps = {
  items: WardrobeItem[];
  onItemClick: (id: string) => void;
};

export function WardrobeGrid({ items, onItemClick }: WardrobeGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium">No items yet</p>
        <p className="text-sm">Upload your first clothing item to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <WardrobeCard key={item.id} item={item} onClick={() => onItemClick(item.id)} />
      ))}
    </div>
  );
}
