import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { useState } from "react";

import { useTagItem } from "../api/use-tag-item";
import { useUploadThing } from "../api/use-upload";
import { useCreateWardrobeItem } from "../api/use-wardrobe";
import { TagReviewForm } from "./tag-review-form";

type UploadState =
  | { step: "idle" }
  | { step: "uploading" }
  | { step: "tagging"; imageUrl: string; imageKey: string }
  | {
      step: "review";
      imageUrl: string;
      imageKey: string;
      tags: {
        name: string;
        category: string;
        color: string;
        style: string;
        seasons: string[];
        occasions: string[];
        brand: string;
      };
    };

export function UploadDialog() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<UploadState>({ step: "idle" });

  const { startUpload, isUploading } = useUploadThing("clothingImage", {
    onClientUploadComplete: (res) => {
      if (res[0]) {
        setState({
          step: "tagging",
          imageUrl: res[0].ufsUrl,
          imageKey: res[0].key,
        });
        tagItem.mutate(res[0].ufsUrl);
      }
    },
  });

  const tagItem = useTagItem();
  const createItem = useCreateWardrobeItem();

  if (tagItem.isSuccess && state.step === "tagging") {
    setState({
      step: "review",
      imageUrl: state.imageUrl,
      imageKey: state.imageKey,
      tags: {
        name: tagItem.data.name ?? "",
        category: tagItem.data.category ?? "",
        color: tagItem.data.color ?? "",
        style: tagItem.data.style ?? "",
        seasons: tagItem.data.seasons ?? [],
        occasions: tagItem.data.occasions ?? [],
        brand: tagItem.data.brand ?? "",
      },
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      setState({ step: "uploading" });
      startUpload(files);
    }
  }

  function handleSave(values: {
    name: string;
    category: string;
    color: string;
    style: string;
    seasons: string[];
    occasions: string[];
    brand: string;
  }) {
    if (state.step !== "review") return;

    createItem.mutate(
      {
        name: values.name,
        imageUrl: state.imageUrl,
        imageKey: state.imageKey,
        category: values.category,
        color: values.color || null,
        style: values.style || null,
        season: values.seasons,
        occasion: values.occasions,
        brand: values.brand || null,
        aiTagsAccepted: true,
      },
      {
        onSuccess: () => {
          setState({ step: "idle" });
          setOpen(false);
        },
      },
    );
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      setState({ step: "idle" });
      tagItem.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button />}>Add Item</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogTitle>
          {state.step === "review" ? "Review Tags" : "Upload Clothing Item"}
        </DialogTitle>
        <DialogDescription>
          {state.step === "review"
            ? "Review the AI-suggested tags and make any changes before saving."
            : "Upload a photo of a clothing item. AI will automatically suggest tags."}
        </DialogDescription>

        {state.step === "idle" && (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed p-10">
            <p className="text-muted-foreground text-sm">Drop an image or click to browse</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file:bg-primary file:text-primary-foreground text-sm file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium"
            />
          </div>
        )}

        {(state.step === "uploading" || isUploading) && (
          <div className="flex flex-col items-center gap-2 py-10">
            <p className="text-muted-foreground text-sm">Uploading...</p>
          </div>
        )}

        {state.step === "tagging" && tagItem.isPending && (
          <div className="flex flex-col items-center gap-2 py-10">
            <p className="text-muted-foreground text-sm">AI is analyzing your item...</p>
          </div>
        )}

        {state.step === "review" && (
          <TagReviewForm
            defaultValues={state.tags}
            imageUrl={state.imageUrl}
            onSubmit={handleSave}
            isSubmitting={createItem.isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
