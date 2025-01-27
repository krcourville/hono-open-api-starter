import type { PropsWithChildren } from 'hono/jsx';

import { html } from 'hono/html';

import { APP_NAME } from '../../../lib/constants';

export function Layout(props: PropsWithChildren<{ title: string }>) {
  return html`<!doctype html>
    <html>
      <head>
        <title>${APP_NAME} - Reference App</title>
      </head>
      <body>
        <h1>${props.title}</h1>

        <nav>
          <ul>
            <li>
              <a href="/reference">Home</a>
            </li>
          </ul>
        </nav>

        ${props.children}
      </body>
    </html>`;
}
