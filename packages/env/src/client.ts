/// <reference types="vite/client" />
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: z.string().url(),
    VITE_APP_URL: z.string().url(),
  },
  runtimeEnvStrict: {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_APP_URL: import.meta.env.VITE_APP_URL,
  },
  emptyStringAsUndefined: true,
});
