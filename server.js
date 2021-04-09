const gatsyExpress = require('gatsby-plugin-express');
const express = require('express')
const app = express();

import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import elasticsearch from 'elasticsearch';
import { elasticApiFieldConfig } from 'graphql-compose-elasticsearch';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            elastic7x: elasticApiFieldConfig(
                // you may provide existed Elastic Client instance
                new elasticsearch.Client({
                    host: 'http://elastic:changeme@localhost:9200',
                    // host: 'http://localhost:9200',
                    apiVersion: '7.x',
                })
            ),
        },
    }),
});

// serve static files before gatsbyExpress
app.use(express.static('public/'));
app.use(gatsyExpress('config/gatsby-express.json', {
    publicDir: 'public/',
    template: 'public/404/index.html',

    // redirects all /path/ to /path
    // should be used with gatsby-plugin-remove-trailing-slashes
    redirectSlashes: true,
}));

app.listen(3000, function() {
    console.log('App started on port 3000');
});

