import type { FileRouter } from "uploadthing/types";

import { createRouteHandler, createUploadthing, UploadThingError } from "uploadthing/server";

import { auth } from "../auth";

const f = createUploadthing();

const uploadRouter: FileRouter = {
  clothingImage: f({
    image: { maxFileSize: "64MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({ headers: req.headers });

      // TODO: re-enable auth once cookie forwarding is confirmed
      const userId = session?.user.id ?? "anonymous";

      return { userId };
    })
    .onUploadComplete(({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl, key: file.key };
    }),
};

export type AppFileRouter = typeof uploadRouter;

const handlers = createRouteHandler({ router: uploadRouter });

export { handlers as uploadHandlers };
