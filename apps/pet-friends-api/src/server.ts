import { Hono } from "hono";
import { serve } from "@hono/node-server";

export const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello World");
});

serve(app);
