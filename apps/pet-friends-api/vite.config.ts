
import {defineConfig} from "vite";
import devServer from "@hono/vite-dev-server";

export default defineConfig({
    root: __dirname,
    cacheDir: "../../node_modules/.vite/apps/pet-friends-api",
    plugins: [
        devServer({
            entry: "./src/index.ts",
        })
    ]
});