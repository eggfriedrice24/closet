import type { FileRouter } from "uploadthing/types";

import { createRouteHandler, createUploadthing } from "uploadthing/server";

import { auth } from "../auth";

const f = createUploadthing();

const uploadRouter: FileRouter = {
  clothingImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({ headers: req.headers });

      if (!session) {
        throw new Error("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl, key: file.key };
    }),
};

export type AppFileRouter = typeof uploadRouter;

const handlers = createRouteHandler({ router: uploadRouter });

export { handlers as uploadHandlers };
