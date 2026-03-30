import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { useWardrobeItems } from "@/features/wardrobe/api/use-wardrobe";
import { UploadDialog } from "@/features/wardrobe/components/upload-dialog";
import { WardrobeFilters } from "@/features/wardrobe/components/wardrobe-filters";
import { WardrobeGrid } from "@/features/wardrobe/components/wardrobe-grid";

export const Route = createFileRoute("/_authenticated/wardrobe")({
  component: WardrobePage,
});

function WardrobePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { data: items = [], isLoading } = useWardrobeItems(selectedCategory);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Wardrobe</h1>
          <p className="text-muted-foreground text-sm">{items.length} items</p>
        </div>
        <UploadDialog />
      </div>
      <WardrobeFilters selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      {isLoading ? (
        <p className="text-muted-foreground py-10 text-center text-sm">Loading...</p>
      ) : (
        <WardrobeGrid items={items} onItemClick={() => {}} />
      )}
    </div>
  );
}
