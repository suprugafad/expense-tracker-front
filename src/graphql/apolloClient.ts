import { ApolloClient, InMemoryCache, HttpLink, from, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import Cookies from 'js-cookie';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('accessToken');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions?.code) {
        case 'UNAUTHENTICATED':
          const refreshToken = Cookies.get('refreshToken') || '';

          client.mutate({
            mutation: gql`
              mutation RefreshAccessToken($refreshToken: String!) {
                refreshToken(refreshToken: $refreshToken) {
                  access_token
                }
              }
            `,
            variables: { refreshToken },
          }).then(response => {
            const accessToken = response.data.refreshToken.access_token;
            
            Cookies.set('accessToken', accessToken);

            operation.setContext(({ headers = {} }) => ({
              headers: {
                ...headers,
                authorization: `Bearer ${accessToken}`,
              }
            }));

            return forward(operation);
          }).catch(refreshError => {
            console.error(refreshError);
          });

          return;
      }
    }
  }
});
    

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;