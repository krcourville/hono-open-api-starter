# hono-open-api-starter

## Contents

- [TODO](TODO.md): TODO list.
- [Why Turborepo?](WHY-TURBOREPO.md): Why Turborepo?
- [/apps](apps): Runnable apps are located and may include APIs, API clients, and Integration Tests.
- [/packages](packages): Shared libraries, used by apps.
- [pet-friends-api](apps/pet-friends-api/README.md): Pet Friends API.

## Getting Started

```sh
npm install
npm run dev
# OR
npm start
```

## Key Technologies

- [Hono](https://hono.dev/): Fast, universal web application framework.
- [Zod](https://zod.dev/): TypeScript-first schema validation with static type inference.
- [Zod OpenAPI Hono](https://www.npmjs.com/package/@hono/zod-openapi): OpenAPI-compliant Hono framework.
- [Vite](https://vitejs.dev/): Fast testing, bundling, and development.
- [Open API](https://www.openapis.org/): Standard for describing, producing, consuming,
  and visualizing RESTful web APIs, providing the following benefits:
  - API-first development: Define the API before implementing it, which feeds into the following benefits.
  - Reduce effort by considering the API design vs implementation, iterating back and forth as needed, without
    duplicating effort or fighting with JSDocs or other abstract metadata.
  - Provide an initial layer of validation for API requests.
  - API documentation: Generate API documentation from the OpenAPI specification.
  - API testing: Test the API using tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).
  - API client generation: Generate client libraries for various programming languages.
  - API governance: Ensure that the API is used correctly and consistently.

## Useful Links

- [Base repo](https://github.com/vercel/turborepo/blob/main/examples/kitchen-sink)
- [Style guide](https://www.npmjs.com/package/@vercel/style-guide)
- [A Complete Guide to Pino Logging in Node.js](https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications)

## More about Turborepo

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
