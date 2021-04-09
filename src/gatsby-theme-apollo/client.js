import fetch from 'isomorphic-fetch';
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';

var CONSTANTS = require('../../CONSTANTS.json')

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        // uri: 'https://api.spacex.land/graphql/',
        uri:  "http://" + CONSTANTS.CLUSTER_IP + ":" + "4000" + "/graphql",
        fetch
    })
});

export default client;