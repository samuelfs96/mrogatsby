import React from 'react';
// import { graphql } from 'gatsby';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import CapabilityTable from "../components/capabilityTable.js"
import ContactTable from "../components/contactTable.js"
import Map from "../components/map"
// import InlineConfirmButton from "react-inline-confirm";
function MroUpdate (props) {

const textValues = ["Update Location", "Are you sure?", "Updating..."];
//const confirmIconClass = `fa fa-${isExecuting ? "circle-o-notch fa-spin" : "fa fa-trash"}`;


// import { ApolloConsumer } from '@apollo/client';
const QUERY_SUPPLIERPROVIDER = gql`
  query SupplierproviderById($id: String!){
    supplierproviderById(id: $id) {
      id,name,
    role
    geometry{
      coordinates
      type
    }
    capabilities{
		id,
      capabilityType,
      acType,
      engineType,
      capabilities,
      ataChapters{
        id,
        ataCategory,
        chapter,
        section,
        paragraph,
        description        
      }
    }
    contacts{
      id,
      person,
      department,
      email,
      number
    }
    }
    }
`;
const UPDATELOCATION = gql`
mutation UpdateSupplierproviderilocation( $id: ID!, $lng: String,$lat: String){
  updateSupplierproviderilocation(id:$id, input:{lat:$lat, lng:$lng}){
    supplierProvider{
     id
      __typename
    }
    __typename
  }
}
`;






const [updateLocation] = useMutation(UPDATELOCATION);


 

    let idsupplierprovider = props.match.params.id;
    const { loading, error, data } = useQuery(QUERY_SUPPLIERPROVIDER, {
      variables: { id: idsupplierprovider },
  })
    // should handle loading status
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    let center = { lat: data.supplierproviderById.geometry.coordinates[1], lng: data.supplierproviderById.geometry.coordinates[0] }

    const mapProps = {
        options: {
            center,
            zoom: 5,
        },
        onMount: map => {
            new window.google.maps.Marker({
                position: center,
                map,
                title: data.name,
            })
            map.addListener("click", (mapsMouseEvent) => {
                let isExecuting = false

                let infoWindow = new window.google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                new window.google.maps.Marker({
                    position: mapsMouseEvent.latLng,
                    map,
                    title: "new location",
                });
                infoWindow.setContent(

                    // JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
                    // <InlineConfirmButton className="btn btn-default" textValues={textValues} showTimer isExecuting={isExecuting} onClick={() => {
                    //     isExecuting = true;
                    //     updateLocation({ variables: { id: data.id, lng: mapsMouseEvent.latLng.lng, lat: mapsMouseEvent.latLng.lat } });
                    //     isExecuting = false
                    // }}>
                    //     <i ></i>
                    // </InlineConfirmButton>
                );
                infoWindow.open(map);
            });
        },
    }

    return (

        <div>
            <p>
                Supplier Provider -{data.supplierproviderById.id} : {data.supplierproviderById.name}
                <CapabilityTable capabilities={data.supplierproviderById.capabilities} name={data.supplierproviderById.name} idsupplierprovider={idsupplierprovider} />
                <ContactTable contacts={data.supplierproviderById.contacts} name={data.supplierproviderById.name} idsupplierprovider={idsupplierprovider} />
                <Map style={{ height: '50vh' }} id="locationUpdateMap" {...mapProps} />
            </p>
        </div>
    );


}
export default MroUpdate