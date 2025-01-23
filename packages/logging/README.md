# logging

Provides a common logging interface for all apps and packages.

## Configuration

The following environment variables are used to configure the logger:

- `LOG_LEVEL`:
  - The minimum log level in which logs will be written.
  - Can be one of: `error`, `warn`, `info`, `debug`.
  - Defaults to `info`.
- `DEV_LOGGER`: Whether to use the dev logger.
  - If set to `true` or `1`, the logger will output in a more readable format.
  - Defaults to `false`.
