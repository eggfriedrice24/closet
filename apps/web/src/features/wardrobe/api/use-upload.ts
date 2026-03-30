import { generateReactHelpers } from "@uploadthing/react";
import { env } from "@workspace/env/client";

export const { useUploadThing } = generateReactHelpers({
  url: `${env.VITE_API_URL}/api/uploadthing`,
});
