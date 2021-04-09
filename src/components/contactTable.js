import React from "react";
import { forwardRef } from 'react';
import MaterialTable from "material-table";
// import { ProgressPlugin } from "webpack";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useMutation } from "@apollo/client";
import gql from 'graphql-tag';
 
export default function ContactTable(props) {
  
const ADDCONTACT=gql`
mutation UpdateSupplierprovider( $id: ID!, $number: String,
$department: String,
$person: String,
$email: String){
  updateSupplierprovider(id:$id, input:{contactsAdd:[{number: $number,
department: $department,
person: $person,
email: $email}]}){
    supplierProvider{
     id
      __typename
    }
    __typename
  }
}
`;
const DELETECONTACT=gql`
mutation UpdateSupplierprovider( $id: ID!,$contactsRemove: [ID] ){
  updateSupplierprovider(id:$id, input:{contactsRemove:$contactsRemove}){
    supplierProvider{
     id
      __typename
    }
    __typename
  }
}
`;
  const UPDATECONTACT = gql`
   mutation UpdateSuppliercontact($id: ID!,
$number: String,
$department: String,
$person: String,
$email: String){
  updateSuppliercontact(id: $id,input: {
number: $number,
department: $department,
person: $person,
email: $email}){
  supplierContact{
  id
  }
}

}
`;
  const [updateContact] = useMutation(UPDATECONTACT);
  const [addContact] = useMutation(ADDCONTACT);
  const [deleteContact] = useMutation(DELETECONTACT);
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const emailPattern = /^(([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})+([;.][ .](([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/

const numberPattern = /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/;
  const [state, setState] = React.useState({
    columns: [
      {
        title:"id",
        field: "id",
        hidden:true
      },
      {
        title: "Number",
        field: "number",
        render: rowData =>  <a href="tel:`${rowData.number}`">{rowData.number}</a>,
        validate: rowData => numberPattern.test(rowData.number)? true:{ isValid: false, helperText: 'Please enter a valid phone number' } ,
      },
      {
        title: "Department",
        field: "department"
      },
      {
        title: "Person",
        field: "person",
        validate: rowData => (rowData.person+"").length < 3 ? { isValid: false, helperText: 'This field must be longer than 3 Chars' } : true, 
      },
    {
      title: "Email",
      field: "email",
      render: rowData =>  <a href="mailto:`${rowData.email}`?subject=`${mroName}`">{rowData.email}</a>,
      validate: rowData => emailPattern.test(rowData.email) ? true:{ isValid: false, helperText: 'Please enter a valid email' } ,
    }
  ],

    data: props.contacts.map(o => ({ ...o })),
    title:`${props.name} Contacts`,
    idsupplierprovider:props.idsupplierprovider,
    mroName:props.name
  });

  return (
    <MaterialTable
    icons={tableIcons}
      title={state.title}
      columns={state.columns}
      data={state.data}
      options={{
        toolbar: true
      }}
      // actions={[
      //   {
      //     icon: "add",
      //     tooltip: "Add User",
      //     isFreeAction: true,
      //     onClick: (event, newData) =>
      //       new Promise(resolve => {
      //         setTimeout(() => {
      //           resolve();
      //           setState(prevState => {
      //             const data = [...prevState.data];
      //             data.push(newData);
      //             return { ...prevState, data };
      //           });
      //         });
      //       })
      //   }
      // ]}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                addContact({variables:{id:state.idsupplierprovider,number:newData.number, department: newData.department, person:newData.person, email:newData.email}});
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  updateContact( { variables: {id:newData.id, number:newData.number, department: newData.department, person:newData.person, email:newData.email},
                  });
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                deleteContact({variables:{id:state.idsupplierprovider,contactsRemove:[oldData.id]}});
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
      isEditHidden= {!props.isUpdate}
      isDeleteHidden= {!props.isUpdate}
    />
  );
}
