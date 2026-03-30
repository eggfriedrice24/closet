import { useMutation } from "@tanstack/react-query";
import { env } from "@workspace/env/client";

type AiTags = {
  name: string;
  category: string;
  color: string;
  style: string;
  seasons: string[];
  occasions: string[];
  brand: string | null;
};

export function useTagItem() {
  return useMutation({
    mutationFn: async (imageUrl: string): Promise<AiTags> => {
      const res = await fetch(`${env.VITE_API_URL}/api/ai/tag-item`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });

      if (!res.ok) {
        throw new Error("AI tagging failed");
      }

      return res.json();
    },
  });
}
