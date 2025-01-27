import { Hono } from 'hono';

import { Layout } from '../../components/layout';
import { apiClient } from '../../services/api-client';

export const pingApp = new Hono();

function Content(props: { response: Record<string, unknown> }) {
  return (
    <Layout title="Ping">
      <label htmlFor="ping-response">Ping Response</label>
      <pre id="ping-response">{JSON.stringify(props.response, null, 2)}</pre>
    </Layout>
  );
}

pingApp.get('/ping', async (c) => {
  const props = {
    response: {},
  };

  let pingResponse;

  const ping = await apiClient['api-utilities'].ping.$get();
  if (ping.status === 200) {
    pingResponse = await ping.json();
  }

  props.response = pingResponse ?? {};

  return c.html(<Content {...props} />);
});
