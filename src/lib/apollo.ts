import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient as createWsClient } from 'graphql-ws';
import { nhost } from './nhost';

const backendUrlRaw = import.meta.env.VITE_NHOST_BACKEND_URL as string | undefined;
const backendUrl = backendUrlRaw ? backendUrlRaw.replace(/\/$/, '') : undefined;
const httpUri = backendUrl ? `${backendUrl}/v1/graphql` : (import.meta.env.VITE_GRAPHQL_URL as string);
const wsUri = backendUrl
	? (backendUrl.startsWith('https://')
		? `${backendUrl.replace('https://', 'wss://')}/v1/graphql`
		: backendUrl.startsWith('http://')
			? `${backendUrl.replace('http://', 'ws://')}/v1/graphql`
			: `${backendUrl}/v1/graphql`)
	: (import.meta.env.VITE_GRAPHQL_WS_URL as string);

if (import.meta.env.DEV) {
	console.log('[env] GraphQL HTTP =', httpUri);
	console.log('[env] GraphQL WS   =', wsUri);
}

const httpLink = new HttpLink({ uri: httpUri });

const authLink = setContext(async (_, { headers }) => {
	const accessToken = await nhost.auth.getAccessToken();
	return {
		headers: {
			...headers,
			Authorization: accessToken ? `Bearer ${accessToken}` : ''
		}
	};
});

const wsClient = createWsClient({
	url: wsUri,
	connectionParams: async () => {
		const accessToken = await nhost.auth.getAccessToken();
		return {
			headers: {
				Authorization: accessToken ? `Bearer ${accessToken}` : ''
			}
		};
	}
});

const wsLink = new GraphQLWsLink(wsClient);

const splitLink = split(
	({ query }) => {
		const def = getMainDefinition(query);
		return def.kind === 'OperationDefinition' && def.operation === 'subscription';
	},
	wsLink,
	authLink.concat(httpLink)
);

export const apollo = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache()
}); 