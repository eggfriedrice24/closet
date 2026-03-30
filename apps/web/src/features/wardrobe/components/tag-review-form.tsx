import { useForm } from "@tanstack/react-form";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";

import { DEFAULT_CATEGORIES, OCCASIONS, SEASONS, STYLES } from "../constants";

type TagFormValues = {
  name: string;
  category: string;
  color: string;
  style: string;
  seasons: string[];
  occasions: string[];
  brand: string;
};

type TagReviewFormProps = {
  defaultValues: TagFormValues;
  imageUrl: string;
  onSubmit: (values: TagFormValues) => void;
  isSubmitting: boolean;
};

export function TagReviewForm({
  defaultValues,
  imageUrl,
  onSubmit,
  isSubmitting,
}: TagReviewFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => onSubmit(value),
  });

  return (
    <div className="grid gap-6 md:grid-cols-[200px_1fr]">
      <div className="aspect-square overflow-hidden rounded-md">
        <img src={imageUrl} alt="Uploaded item" className="h-full w-full object-cover" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>
            <form.Field name="category">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <select
                    id="category"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-input bg-input/20 h-9 w-full rounded-md border px-3 text-sm"
                  >
                    {DEFAULT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    {!DEFAULT_CATEGORIES.includes(
                      field.state.value as (typeof DEFAULT_CATEGORIES)[number],
                    ) && (
                      <option value={field.state.value}>{field.state.value} (AI suggested)</option>
                    )}
                  </select>
                </Field>
              )}
            </form.Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <form.Field name="color">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="color">Color</FieldLabel>
                  <Input
                    id="color"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>
            <form.Field name="style">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="style">Style</FieldLabel>
                  <select
                    id="style"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-input bg-input/20 h-9 w-full rounded-md border px-3 text-sm"
                  >
                    <option value="">None</option>
                    {STYLES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            </form.Field>
            <form.Field name="brand">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="brand">Brand</FieldLabel>
                  <Input
                    id="brand"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Optional"
                  />
                </Field>
              )}
            </form.Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="seasons">
              {(field) => (
                <Field>
                  <FieldLabel>Seasons</FieldLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {SEASONS.map((season) => (
                      <Button
                        key={season}
                        type="button"
                        size="xs"
                        variant={field.state.value.includes(season) ? "default" : "outline"}
                        onClick={() => {
                          const next = field.state.value.includes(season)
                            ? field.state.value.filter((s) => s !== season)
                            : [...field.state.value, season];
                          field.handleChange(next);
                        }}
                      >
                        {season}
                      </Button>
                    ))}
                  </div>
                </Field>
              )}
            </form.Field>
            <form.Field name="occasions">
              {(field) => (
                <Field>
                  <FieldLabel>Occasions</FieldLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {OCCASIONS.map((occasion) => (
                      <Button
                        key={occasion}
                        type="button"
                        size="xs"
                        variant={field.state.value.includes(occasion) ? "default" : "outline"}
                        onClick={() => {
                          const next = field.state.value.includes(occasion)
                            ? field.state.value.filter((o) => o !== occasion)
                            : [...field.state.value, occasion];
                          field.handleChange(next);
                        }}
                      >
                        {occasion}
                      </Button>
                    ))}
                  </div>
                </Field>
              )}
            </form.Field>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Item"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
