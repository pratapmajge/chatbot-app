import { NhostClient } from '@nhost/nhost-js';

const subdomain = import.meta.env.VITE_NHOST_SUBDOMAIN as string;
const region = import.meta.env.VITE_NHOST_REGION as string;
const backendUrlRaw = import.meta.env.VITE_NHOST_BACKEND_URL as string | undefined;
const backendUrl = backendUrlRaw ? backendUrlRaw.replace(/\/$/, '') : undefined;

if (import.meta.env.DEV) {
	// Minimal diagnostics
	console.log('[env] VITE_NHOST_BACKEND_URL =', backendUrl || '(unset)');
	console.log('[env] VITE_NHOST_SUBDOMAIN =', subdomain || '(unset)');
	console.log('[env] VITE_NHOST_REGION =', region || '(unset)');
}

export const nhost = backendUrl
	? new NhostClient({
		authUrl: `${backendUrl}/v1/auth`,
		storageUrl: `${backendUrl}/v1/storage`,
		graphqlUrl: `${backendUrl}/v1/graphql`,
		functionsUrl: `${backendUrl}/v1/functions`
	})
	: new NhostClient({ subdomain, region }); 