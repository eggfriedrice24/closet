import { Button } from "@workspace/ui/components/button";

import { DEFAULT_CATEGORIES } from "../constants";

type WardrobeFiltersProps = {
  selectedCategory: string | undefined;
  onCategoryChange: (category: string | undefined) => void;
};

export function WardrobeFilters({ selectedCategory, onCategoryChange }: WardrobeFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        size="sm"
        variant={selectedCategory === undefined ? "default" : "outline"}
        onClick={() => onCategoryChange(undefined)}
      >
        All
      </Button>
      {DEFAULT_CATEGORIES.map((category) => (
        <Button
          key={category}
          size="sm"
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
