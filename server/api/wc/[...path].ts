import { defineEventHandler, getMethod, getQuery, setResponseStatus, H3Event, readRawBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const method = getMethod(event);
  const query = getQuery(event);

  const runtime = useRuntimeConfig(event);
  const wcConfig = runtime.woocommerce;

  if (!wcConfig?.url || !wcConfig?.consumerKey || !wcConfig?.consumerSecret) {
    setResponseStatus(event, 500);
    return { error: 'WooCommerce configuration is missing' };
  }

  const pathParam = (event.context.params as any)?.path;
  const path = Array.isArray(pathParam) ? pathParam.join('/') : (pathParam || '');

  // Build target URL
  const targetUrl = new URL(`${wcConfig.url.replace(/\/+$/, '')}/wp-json/wc/v3/${path}`);

  // Forward all client query params first
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => targetUrl.searchParams.append(key, String(v)));
    } else if (value !== undefined) {
      targetUrl.searchParams.set(key, String(value));
    }
  });

  // Inject credentials server-side
  targetUrl.searchParams.set('consumer_key', wcConfig.consumerKey);
  targetUrl.searchParams.set('consumer_secret', wcConfig.consumerSecret);

  try {
    // Only GET/HEAD are expected currently; support body pass-through if needed
    const body =
      method && !['GET', 'HEAD'].includes(method.toUpperCase())
        ? await readRawBody(event)
        : undefined;

    const result = await $fetch(targetUrl.toString(), {
      method,
      body,
    });

    return result;
  } catch (err: any) {
    const status = err?.response?.status || 500;
    setResponseStatus(event, status);
    return {
      error: 'WooCommerce proxy request failed',
      status,
      message: err?.data || err?.message || String(err),
    };
  }
});



