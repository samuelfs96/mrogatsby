// import React from "react";
// import { forwardRef } from 'react';
// import MaterialTable from "material-table";
// // import { ProgressPlugin } from "webpack";
// import AddBox from '@material-ui/icons/AddBox';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import Check from '@material-ui/icons/Check';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
// import ChevronRight from '@material-ui/icons/ChevronRight';
// import Clear from '@material-ui/icons/Clear';
// import DeleteOutline from '@material-ui/icons/DeleteOutline';
// import Edit from '@material-ui/icons/Edit';
// import FilterList from '@material-ui/icons/FilterList';
// import FirstPage from '@material-ui/icons/FirstPage';
// import LastPage from '@material-ui/icons/LastPage';
// import Remove from '@material-ui/icons/Remove';
// import SaveAlt from '@material-ui/icons/SaveAlt';
// import Search from '@material-ui/icons/Search';
// import ViewColumn from '@material-ui/icons/ViewColumn';
// import { useMutation } from "@apollo/client";
// import gql from 'graphql-tag';
// import AtaChaptersTable from "../components/atachapterstable.js"

// export default function CapabilityTable(props) {
//   // CreateSupplierCapability

// const ADDCAPABILITY=gql`
// mutation UpdateSupplierprovider( $id: ID!, $capabilityType:SupplierCapabilityCapabilityTypeInput, $acType:SupplierCapabilityAcTypeInput, $engineType:SupplierCapabilityEngineTypeInput, $capabilities: JSONString!,$ataChapters: [ID]! ){
//   updateSupplierprovider(id:$id, input:{capabilitiesAdd:[{capabilityType:$capabilityType, acType: $acType, engineType:$engineType, capabilities:$capabilities,ataChapters: $ataChapters}]}){
//     supplierProvider{
//      id
//       __typename
//     }
//     __typename
//   }
// }
// `;
// const DELETECAPABILITY=gql`
// mutation UpdateSupplierprovider( $id: ID!,$capabilitiesRemove: [ID] ){
//   updateSupplierprovider(id:$id, input:{capabilitiesRemove:$capabilitiesRemove}){
//     supplierProvider{
//      id
//       __typename
//     }
//     __typename
//   }
// }
// `;
//   const UPDATECAPABILITY = gql`
//     mutation UpdateSuppliercapability( $id: ID!,$capabilityType:SupplierCapabilityCapabilityTypeInput, $acType:SupplierCapabilityAcTypeInput, $engineType:SupplierCapabilityEngineTypeInput, $capabilities: JSONString!,$ataChapters: [ID]! ){
//   updateSuppliercapability(id:$id, input:{capabilityType:$capabilityType, acType: $acType, engineType:$engineType, capabilities:$capabilities,ataChapters: $ataChapters}){

//     supplierCapability{
//      id
//     }
//   }
// }
// `;
//   const [updateCapability] = useMutation(UPDATECAPABILITY);
//   const [addCapability] = useMutation(ADDCAPABILITY);
//   const [deleteCapability] = useMutation(DELETECAPABILITY);
// const tableIcons = {
//   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//   DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
//   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//   SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
// };

//   const [state, setState] = React.useState({
//     columns: [
//       {
//         title:"id",
//         field: "id",
//         hidden:true
//       },
//       {
//         title: "Capability",
//         field: "capabilityType",
//         lookup: {"LINE": "Line",
//         "BASE": "Base",
//         "ENG": "Engine",
//         "MRO": "MRO",
//         "RPRS": "Repair Shop",
//         "L&W": "LG & Wheel",
//         "PAOG": "Parts - AOG",
//         "PNORM": "Parts - Normal",
//         "LAOG": "Logistics - AOG",
//         "LNORM": "Logistics - Normal",
//         "LABS": "Labs"}
//       },
//       {
//         title: "Fleet Type",
//         field: "acType",
//         lookup: {"B737": "B737",
//         "B747": "B747",
//         "B767": "B767",
//         "B777": "B777",
//         "B777X": "B777X",
//         "B787": "B787",
//         "BBJ": "B717",
//         "B717": "BBJ",
//         "A319": "A319",
//         "A320_NEO": "A320 NEO",
//         "A321_NEO": "A330 NEO",
//         "A330_NEO": "A321 NEO",
//         "A350": "A350",
//         "A380": "A380"}
//       },
//       {
//         title: "Engine Type",
//         field: "engineType",
//         lookup: {CF6: "CF6",
//         CFM56: "CFM56",
//         GE90: "GE90",
//         GP7200: "GP7200",
//         GENX: "GENX",
//         CFM_LEAP: "CFM_LEAP",
//         GE9X: "GE9X",
//         CF34: "CF34",
//         RR_Trent: "RR_Trent",
//         RB211: "RB211",
//         RR500: "RR500",
//         RR300: "RR300",
//         IAE_V2500: "IAE_V2500",
//         RR250: "RR250",
//         MTR390: "MTR390",
//         XWB: "XWB"}
//       },
//     {
//       title: "Other Capabilities",
//       field: "capabilities",
//       initialEditValue:"[{}]"
//     },
//     {
//       field: 'atachapters',
//       render: data => (

//           <AtaChaptersTable ataChapters={data.ataChapters} idcapabilities={data.id}/>

//       )
//     },
//   ],
//     data: props.capabilities.map(o => ({ ...o })),
//     title:`${props.name} Capabilities`,
//     idsupplierprovider:props.idsupplierprovider
//   });

//   return (
//     <MaterialTable
//     icons={tableIcons}
//       title={state.title}
//       columns={state.columns}
//       data={state.data}
//       options={{
//         toolbar: true
//       }}
//       // actions={[
//       //   {
//       //     icon: "add",
//       //     tooltip: "Add User",
//       //     isFreeAction: true,
//       //     onClick: (event, newData) =>
//       //       new Promise(resolve => {
//       //         setTimeout(() => {
//       //           resolve();
//       //           setState(prevState => {
//       //             const data = [...prevState.data];
//       //             data.push(newData);
//       //             return { ...prevState, data };
//       //           });
//       //         });
//       //       })
//       //   }
//       // ]}
//       editable={{
//         onRowAdd: newData =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               resolve();
//               setState(prevState => {
//                 const data = [...prevState.data];
//                 data.push(newData);
//                 addCapability({variables:{id:state.idsupplierprovider,capabilityType:newData.capabilityType, acType: newData.acType, engineType:newData.engineType, capabilities:newData.capabilities,ataChapters:[]]}});
//                 return { ...prevState, data };
//               });
//             }, 600);
//           }),
//         onRowUpdate: (newData, oldData) =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               resolve();
//               if (oldData) {
//                 setState(prevState => {
//                   const data = [...prevState.data];
//                   data[data.indexOf(oldData)] = newData;
//                   updateCapability( { variables: {id:newData.id, capabilityType:newData.capabilityType, acType: newData.acType, engineType:newData.engineType, capabilities:newData.capabilities,ataChapters:newData.ataChapters},

//                   });
//                   return { ...prevState, data };
//                 });
//               }
//             }, 600);
//           }),
//         onRowDelete: oldData =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               resolve();
//               setState(prevState => {
//                 const data = [...prevState.data];
//                 data.splice(data.indexOf(oldData), 1);
//                 deleteCapability({variables:{id:state.idsupplierprovider,capabilitiesRemove:[oldData.id]}});
//                 return { ...prevState, data };
//               });
//             }, 600);
//           })
//       }}
//     />
//   );
// }
