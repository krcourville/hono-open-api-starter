import { Hono } from 'hono';

import { APP_NAME } from '../../../lib/constants';
import { Layout } from '../components/layout';

export const homeApp = new Hono();

homeApp.get('/', (c) => {
  return c.html(
    <Layout title={`${APP_NAME} Reference App`}>
      <ul>
        <li>
          <a href="/reference/ping">Ping</a>
        </li>
      </ul>
    </Layout>,
  );
});
