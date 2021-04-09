import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const CONSTANTS = require("../../CONSTANTS.json")

export const client = new ApolloClient({
  connectToDevTools: true,
  link: new HttpLink({
    // uri: CONSTANTS.CORE_DOMAIN + "/graphene/graphql/",
      uri: CONSTANTS.SEARCHKIT_DOMAIN + "/graphql",
    fetch,
  }),
  cache: new InMemoryCache()
});

// import fetch from 'cross-fetch';
// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// export const client = new ApolloClient({
//     link: new HttpLink({
//         uri: 'https://api-euwest.graphcms.com/v1/cjke2kn7p00ol01d2pinkptdj/master',
//         fetch,
//     }),
//     cache: new InMemoryCache()
// });
