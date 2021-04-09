import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import express from 'express';
const app = express()
const port = 3000

var CONSTANTS = require('./CONSTANTS.json')
console.log(CONSTANTS);

import graphql from 'graphql';
const { GraphQLSchema, GraphQLObjectType } = graphql;

import elasticsearch from 'elasticsearch';

import graphql_compose_elasticsearch from 'graphql-compose-elasticsearch';
const { elasticApiFieldConfig } = graphql_compose_elasticsearch;
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://elastic:changeme@localhost:9200' })


// You can use both the callback-style API and the promise-style API, both behave the same way.

// promise API
// const result = await client.search({
//     index: 'airport_search',
//     body: {
//         query: {
//             match: { city: 'Melbourne' }
//         }
//     }
// })

// callback API
client.search({
    index: 'airport_search',
    body: {
        query: {
            match: { city: 'Melbourne' }
        }
    }
}, (err, result) => {
    if (err) console.log(err)
    console.log(result)
})

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

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
