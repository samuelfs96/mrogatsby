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
 
export default function AtaChaptersTable(props) {
  
const ADDATACHAPTER=gql`
mutation UpdateSupplierCapability( $id: ID!, $ataCategory: String,$chapter: String, $section: String, $paragraph: String, $description: String){
  patchSuppliercapability(id:$id, input:{ataChaptersAdd:[{ataCategory: $ataCategory, chapter: $chapter, section:$section,paragraph: $paragraph, description: $description}]}){
    supplierCapability{
     id
      __typename
    }
    __typename
  }
}
`;
const DELETEATACHAPTER=gql`
mutation UpdateSupplierCapability( $id: ID!,$ataChaptersRemove: [ID] ){
  patchSuppliercapability(id:$id, input:{ataChaptersRemove:$ataChaptersRemove}){
    supplierCapability{
     id
      __typename
    }
    __typename
  }
}
`;
  const UPDATEATACHAPTER = gql`
   mutation UpdateAtachapter($id: ID!,
$ataCategory: String,$chapter: String, $section: String, $paragraph: String, $description: String){
  updateAtachapter(id: $id,input: {
ataCategory: $ataCategory, chapter: $chapter, section:$section, paragraph: $paragraph, description: $description}){
  ataChapter{
  id
  }
}

}
`;
  const [updateAtachapter] = useMutation(UPDATEATACHAPTER);
  const [addAtachapter] = useMutation(ADDATACHAPTER);
  const [deleteAtachapter] = useMutation(DELETEATACHAPTER);
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
  const [state, setState] = React.useState({
    columns: [
      {
        title:"id",
        field: "id",
        hidden:true
      },
      {
        title: "Category",
        field: "ataCategory",
      },
      {
        title: "Chapter",
        field: "chapter"
      },
      {
        title: "Section",
        field: "section",
      },
      {
        title: "Paragraph",
        field: "paragraph",
      },
    {
      title: "Description",
      field: "description",
    }
  ],

    data: props.ataChapters? props.ataChapters.map(o => ({ ...o })):[],
    title:`ATA Chapters`,
    idcapabilities:props.idcapabilities
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
                addAtachapter({variables:{id:state.idcapabilities,ataCategory:newData.ataCategory, chapter: newData.chapter, section:newData.section, paragraph:newData.paragraph, description:newData.description}});
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
                  updateAtachapter( { variables: {id:newData.id, ataCategory:newData.ataCategory, chapter: newData.chapter, section:newData.section, paragraph:newData.paragraph, description:newData.description}});
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
                deleteAtachapter({variables:{id:state.idcapabilities,ataChaptersRemove:[oldData.id]}});
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
