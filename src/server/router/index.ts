// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { roomRouter } from "./room";
// import { authRouter } from "./auth";

import fetch from "node-fetch";

if (!global.fetch) {
  (global.fetch as any) = fetch;
}

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("room.", roomRouter);
  // .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
