import type { AppType } from "server/types";

import { env } from "@workspace/env/client";
import { hc } from "hono/client";

export const api = hc<AppType>(env.VITE_API_URL);
