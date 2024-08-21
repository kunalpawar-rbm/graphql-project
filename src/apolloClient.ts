import { ApolloClient, InMemoryCache, ApolloClientOptions } from '@apollo/client';

// Define the configuration options for ApolloClient
const clientOptions: ApolloClientOptions<any> = {
  uri: 'https://spacex-production.up.railway.app/', 
  cache: new InMemoryCache(),
};

// Create the ApolloClient instance with the typed options
const client: ApolloClient<any> = new ApolloClient(clientOptions);

export default client;