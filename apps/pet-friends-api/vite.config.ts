
import {defineConfig} from "vite";
import devServer from "@hono/vite-dev-server";

// eslint-disable-next-line import/no-default-export -- vite requires default export
export default defineConfig({
    root: __dirname,
    cacheDir: "../../node_modules/.vite/apps/pet-friends-api",
    plugins: [
        devServer({
            entry: "./src/index.ts",
        })
    ]
});