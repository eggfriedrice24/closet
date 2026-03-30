import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { env } from "@workspace/env/client";

const BASE_URL = `${env.VITE_API_URL}/api/wardrobe`;

async function fetchWithAuth(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export function useWardrobeItems(category?: string) {
  const params = category ? `?category=${encodeURIComponent(category)}` : "";

  return useQuery({
    queryKey: ["wardrobe", { category }],
    queryFn: () => fetchWithAuth(`${BASE_URL}${params}`),
  });
}

export function useWardrobeItem(id: string) {
  return useQuery({
    queryKey: ["wardrobe", id],
    queryFn: () => fetchWithAuth(`${BASE_URL}/${id}`),
  });
}

export function useCreateWardrobeItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      imageUrl: string;
      imageKey: string;
      category: string;
      color?: string | null;
      style?: string | null;
      season?: string[] | null;
      occasion?: string[] | null;
      brand?: string | null;
      notes?: string | null;
      aiTagsAccepted?: boolean;
    }) => fetchWithAuth(BASE_URL, { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wardrobe"] });
    },
  });
}

export function useUpdateWardrobeItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; [key: string]: unknown }) =>
      fetchWithAuth(`${BASE_URL}/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wardrobe"] });
    },
  });
}

export function useDeleteWardrobeItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => fetchWithAuth(`${BASE_URL}/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wardrobe"] });
    },
  });
}
