/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

var CONSTANTS = require('./CONSTANTS.json')
console.log(CONSTANTS);

// const myQuery = `{
//   allSitePage {
//     edges {
//       node {
//         path
//         internal {
//           type
//           contentDigest
//           owner
//         }
//       }
//     }
//   }
// }`;

// const queries = [
//     {
//         query: myQuery,
//         transformer: ({ data }) => data.allSitePage.edges.map(({ node }) => node), // optional
//         indexName: 'pages', //
//         indexConfig: {
//             // optional, any index settings or mappings
//             // mappings,
//             // settings,
//         },
//     },
// ];

module.exports = {
    siteMetadata: {
        title: `FOR-FindingMRO`,
        author: `FORLOOP`,
        constants: CONSTANTS,
    },
    plugins: [
        // {
        //     resolve: `gatsby-source-filesystem`,
        //     options: {
        //         name: `src`,
        //         path: `${__dirname}/src/`,
        //     },
        // },

        // Simple config, passing URL
        // {
        //     resolve: "gatsby-source-graphql",
        //     options: {
        //         // Arbitrary name for the remote schema Query type
        //         typeName: "SWAPI",
        //         // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        //         fieldName: "swapi",
        //         // Url to query from
        //         url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
        //     },
        // },
        {
            resolve: 'gatsby-source-graphql',
            options: {
                typeName: 'RMAPI',
                fieldName: 'rickAndMorty',
                url: 'https://rickandmortyapi.com/graphql',
            },
        },
        // Add the configurations
        {
            resolve: "gatsby-source-graphql",
            options: {
                // Arbitrary name for the remote schema Query type
                typeName: "django",
                // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
                fieldName: "DJANGO",
                // Url or Django Graphene Endpoint
                url: `${CONSTANTS.CORE_DOMAIN}/graphene/graphql/`,
            },
        },
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        {
            resolve: "gatsby-source-mongodb",
            options: {
              dbName: CONSTANTS.MONGO_DB,
              server: { address: CONSTANTS.CLUSTER_IP, port: CONSTANTS.MONGO_PORT },
              collection: "mro_mro",
            },
        },
        {
            resolve: 'gatsby-plugin-apollo',
            options: {
              // uri:  "CONSTANTS.CORE_DOMAIN + "/_graphql"
                uri:  `${CONSTANTS.SEARCHKIT_DOMAIN}/graphql`
                // uri: "https://swapi-graphql.netlify.app/.netlify/functions/index"
                // uri: 'https://api-euwest.graphcms.com/v1/cjke2kn7p00ol01d2pinkptdj/master',
            }
        },
        // {
        //     resolve: `@logilab/gatsby-plugin-elasticsearch`,
        //     options: {
        //         node: `http://${CONSTANTS.CLUSTER_IP}:${CONSTANTS.ELASTIC_SEARCH_PORT}`,
        //         // apiKey: process.env.ES_API_KEY, // optional
        //         queries,
        //         chunkSize: 10000, // default: 1000
        //     },
        // },
        // {
        //     resolve: 'gatsby-plugin-express',
        //     options: {
        //         output: 'config/gatsby-express.json',
        //     }
        // },
        `gatsby-plugin-sass`,
        'gatsby-theme-apollo',
        `gatsby-plugin-sharp`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
              start_url: `/`,
              icon: `src/img/favicon.png`
            },
          },
    ],
}
// // In your gatsby-config.js
// module.exports = {
//   plugins: [

// How to Query
// {
//   # This is the fieldName you've defined in the config
//   swapi {
//     allSpecies {
//       name
//     }
//   }
//   github {
//     viewer {
//       email
//     }
//   }
// }
// Schema definitions
// By default, the schema is introspected from the remote schema. The schema is cached in the .cache directory, and refreshing the schema requires deleting the cache (e.g. by restarting gatsby develop).

// To control schema consumption, you can alternatively construct the schema definition by passing a createSchema callback. This way you could, for example, read schema SDL or introspection JSON. When the createSchema callback is used, the schema isn’t cached. createSchema can return a GraphQLSchema instance, or a Promise resolving to one.

// const fs = require("fs")
// const { buildSchema, buildClientSchema } = require("graphql")

// module.exports = {
//   plugins: [
//     {
//       resolve: "gatsby-source-graphql",
//       options: {
//         typeName: "SWAPI",
//         fieldName: "swapi",
//         url: "https://api.graphcms.com/simple/v1/swapi",

//         createSchema: async () => {
//           const json = JSON.parse(
//             fs.readFileSync(`${__dirname}/introspection.json`)
//           )
//           return buildClientSchema(json.data)
//         },
//       },
//     },
//     {
//       resolve: "gatsby-source-graphql",
//       options: {
//         typeName: "SWAPI",
//         fieldName: "swapi",
//         url: "https://api.graphcms.com/simple/v1/swapi",

//         createSchema: async () => {
//           const sdl = fs.readFileSync(`${__dirname}/schema.sdl`).toString()
//           return buildSchema(sdl)
//         },
//       },
//     },
//   ],
// }
// Custom transform schema function (advanced)
// It’s possible to modify the remote schema, via a transformSchema option which customizes the way the default schema is transformed before it is merged on the Gatsby schema by the stitching process.

// The transformSchema function gets an object argument with the following fields:

// schema (introspected remote schema)
// link (default link)
// resolver (default resolver)
// defaultTransforms (an array with the default transforms)
// options (plugin options)
// The return value is expected to be the final schema used for stitching.

// Below an example configuration that uses the default implementation (equivalent to not using the transformSchema option at all):

// const { wrapSchema } = require(`@graphql-tools/wrap`)
// const { linkToExecutor } = require(`@graphql-tools/links`)

// module.exports = {
//   plugins: [
//     {
//       resolve: "gatsby-source-graphql",
//       options: {
//         typeName: "SWAPI",
//         fieldName: "swapi",
//         url: "https://api.graphcms.com/simple/v1/swapi",
//         transformSchema: ({
//           schema,
//           link,
//           resolver,
//           defaultTransforms,
//           options,
//         }) => {
//           return wrapSchema(
//             {
//               schema,
//               executor: linkToExecutor(link),
//             },
//             defaultTransforms
//           )
//         }
//     },
//   ]
// }
// For details, refer to https://www.graphql-tools.com/docs/schema-wrapping.

// An use case for this feature can be seen in this issue.

// Refetching data
// By default, gatsby-source-graphql will only refetch the data once the server is restarted. It’s also possible to configure the plugin to periodically refetch the data. The option is called refetchInterval and specifies the timeout in seconds.

// module.exports = {
//   plugins: [
//     // Simple config, passing URL
//     {
//       resolve: "gatsby-source-graphql",
//       options: {
//         // Arbitrary name for the remote schema Query type
//         typeName: "SWAPI",
//         // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
//         fieldName: "swapi",
//         // Url to query from
//         url: "https://api.graphcms.com/simple/v1/swapi",

//         // refetch interval in seconds
//         refetchInterval: 60,
//       },
//     },
//   ],
// }
// Performance tuning
// By default, gatsby-source-graphql executes each query in a separate network request. But the plugin also supports query batching to improve query performance.

// Caveat: Batching is only possible for queries starting at approximately the same time. In other words it is bounded by the number of parallel GraphQL queries executed by Gatsby (by default it is 4).

// Fortunately, we can increase the number of queries executed in parallel by setting the environment variable GATSBY_EXPERIMENTAL_QUERY_CONCURRENCY to a higher value and setting the batch option of the plugin to true.

// Example:

// cross-env GATSBY_EXPERIMENTAL_QUERY_CONCURRENCY=20 gatsby develop
// With plugin config:

// const fs = require("fs")
// const { buildSchema, buildClientSchema } = require("graphql")

// module.exports = {
//   plugins: [
//     {
//       resolve: "gatsby-source-graphql",
//       options: {
//         typeName: "SWAPI",
//         fieldName: "swapi",
//         url: "https://api.graphcms.com/simple/v1/swapi",
//         batch: true,
//       },
//     },
//   ],
// }
// By default, the plugin batches up to 5 queries. You can override this by passing dataLoaderOptions and set a maxBatchSize:

// const fs = require("fs")
// const { buildSchema, buildClientSchema } = require("graphql")

// module.exports = {
//   plugins: [
//     {
//       resolve: "gatsby-source-graphql",
//       options: {
//         typeName: "SWAPI",
//         fieldName: "swapi",
//         url: "https://api.graphcms.com/simple/v1/swapi",
//         batch: true,
//         // See https://github.com/graphql/dataloader#new-dataloaderbatchloadfn--options
//         // for a full list of DataLoader options
//         dataLoaderOptions: {
//           maxBatchSize: 10,
//         },
//       },
//     },
//   ],
// }
// Having 20 parallel queries with 5 queries per batch means we are still running 4 batches in parallel.

// Each project is unique so try tuning those two variables and see what works best for you. We’ve seen up to 5-10x speed-up for some setups.

// How batching works
// Under the hood gatsby-source-graphql uses DataLoader for query batching. It merges all queries from a batch to a single query that gets sent to the server in a single network request.

// Consider the following example where both of these queries are run:

// {
//   query: `query(id: Int!) {
//     node(id: $id) {
//       foo
//     }
//   }`,
//   variables: { id: 1 },
// }
// {
//   query: `query(id: Int!) {
//     node(id: $id) {
//       bar
//     }
//   }`,
//   variables: { id: 2 },
// }
// They will be merged into a single query:

// {
//   query: `
//     query(
//       $gatsby0_id: Int!
//       $gatsby1_id: Int!
//     ) {
//       gatsby0_node: node(id: $gatsby0_id) {
//         foo
//       }
//       gatsby1_node: node(id: $gatsby1_id) {
//         bar
//       }
//     }
//   `,
//   variables: {
//     gatsby0_id: 1,
//     gatsby1_id: 2,
//   }
// }
// Then gatsby-source-graphql splits the result of this single query into multiple results and delivers it back to Gatsby as if it executed multiple queries:

// {
//   data: {
//     gatsby0_node: { foo: `foo` },
//     gatsby1_node: { bar: `bar` },
//   },
// }
// is transformed back to:

// [
//   { data { node: { foo: `foo` } } },
//   { data { node: { bar: `bar` } } },
// ]
// Note that if any query result contains errors the whole batch will fail.

// Apollo-style batching
// If your server supports apollo-style query batching you can also try HttpLinkDataLoader. Pass it to the gatsby-source-graphql plugin via the createLink option.

// This strategy is usually slower than query merging but provides better error reporting.
