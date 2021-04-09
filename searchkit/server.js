var CONSTANTS = require('../CONSTANTS.json')
console.log(CONSTANTS);

const express = require("express")
const cors = require("cors")
const { ApolloServer, gql } = require("apollo-server-express")
const {
  MultiMatchQuery,
  SearchkitResolvers,
  SearchkitSchema,
  RefinementSelectFacet,
} = require("@searchkit/apollo-resolvers")

console.log(`Elastic URL: http://elastic:changeme@${CONSTANTS.ELASTIC_SEARCH_HOST}:${CONSTANTS.ELASTIC_SEARCH_PORT}`);

const searchkitConfig = {
  host: `http://elastic:changeme@${CONSTANTS.ELASTIC_SEARCH_HOST}:${CONSTANTS.ELASTIC_SEARCH_PORT}`,
  index: "supplierprovider_search",
  hits: {
    fields: [],
  },
  query: new MultiMatchQuery({ fields: ["name", "capability_type", "ac_type", "engine_type"] }),
  facets: [
    new RefinementSelectFacet({
      field: 'ac_type.raw',
      id: 'ac_type',
      label: 'Aircraft Type',
      display: 'ComboBoxFacet',
      multipleSelect: true,
      size: 10000
    }),
    new RefinementSelectFacet({
      field: 'engine_type.raw',
      id: 'engine_type',
      label: 'Engine',
      display: 'ComboBoxFacet',
      multipleSelect: true,
      size: 10000
    }),
    new RefinementSelectFacet({
      field: 'capability_type.raw',
      id: 'capability_type',
      label: 'Capability',
      display: 'ComboBoxFacet',
      multipleSelect: true,
      size: 10000
    }),
  ],
}

// Construct a schema, using GraphQL schema language
const typeDefs = [
  gql`
    type Query {
      root: String
    }

    type Mutation {
      root: String
    }

    type Contacts {
      number: String
      department: String
      person: String
      email: String
    }

    type Capability {
      capability_type: [String]
      ac_type: [String]
      engine_type: [String]
      slot_availability: String
      etops: String
      certification_type: String
      b2: String
      rat_test: String
      other_nearest_suppliers: String
      capability_24_7: String
      on_call_support: String
      cost_details: String
      call_out_charge: String
      deep_clean: String
      hangar_availability: String
      spare_wheel_availability: String
      exterior_wash: String
      BSI_capability: String
      paint: String
      jacking_facility: String
      platform: String
      cherry_picker: String
      deicing_cart: String
      lift_equipment: String
      eng_run: String
      composite_repairs: String
      ndt: String
      engine_analysis: String
    }

    type HitFields {
      root: String
      uid: Int
      address: String
      name: String
      latitude: Float
      longitude: Float
      capability_type: [String]
      ac_type: [String]
      engine_type: [String]
      full_capabilities: [Capability]
      contacts: [Contacts]
      note: String
    }
  `,
  SearchkitSchema,
]

console.log(typeDefs)

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    ...SearchkitResolvers(searchkitConfig),
  },
  introspection: true,
  playground: true,
  context: {},
})

const app = express()
app.use(cors())
server.applyMiddleware({ app })

app.listen({ port: 4000, host: "0.0.0.0" }, () =>
  console.log(`🚀 Server ready at ${CONSTANTS.SEARCHKIT_DOMAIN}${server.graphqlPath}`)
)
