import React from 'react';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import CapabilityTable from "../components/capabilityTable.js"
// import { ApolloConsumer } from '@apollo/client';
const QUERY_SUPPLIERPROVIDER = gql`
  query {
    supplierproviderById(id: {supplierProviderId}) {
   id,name,
    capabilities{
		id,
      capabilityType,
      acType,
      engineType,
      ataChapters
    }
    contacts{
      person,
      department,
      email,
      number
    }
    }
    }
`;




supplierProviderId
export function Supplierprovider() {
  let supplierProviderId=3;
  const { data, loading } = useQuery(
    QUERY_SUPPLIERPROVIDER, {
      pollInterval: 50000 // refetch the result every 0.5 second
    }
  );
  // const WithApolloClient = () => (
    // <ApolloConsumer>
    //   {client => 'We have access to the client!' 
       // Polling: provides near-real-time synchronization with
      // your server by causing a query to execute periodically
      // at a specified interval
      
      
      // should handle loading status
      if (loading) return <p>Loading...</p>;
       
      return  (
        <div key={data.supplierproviderById.id}>
          <p>
            Supplier Provider - {data.supplierproviderById.id}: {data.supplierproviderById.name} 
          </p>
        <CapabilityTable data={data.supplierproviderById.capabilities} idsupplierprovider={supplierProviderId}/>
        </div>
      );
    // }
    // </ApolloConsumer>
  // );
 
}