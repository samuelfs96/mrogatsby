import React from "react"
// import { ReactiveBase, DataSearch, SingleList } from '@appbaseio/reactivesearch';
// import { Popover, OverlayTrigger, Container, Button, Row, Col } from 'react-bootstrap';
import EuiPopover from "@elastic/eui"
import {
  withSearchkit,
  useSearchkitQuery
} from "@searchkit/client"

class PopupContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: props.name,
      // person: props.person,
      // department: props.department,
      // email: props.email,
      // number: props.number
    }
  }


  render() {

    // const formContent = (
    //     <EuiForm>


    //       <EuiFormRow label="Contact Person/ Department">
    //       <EuiInnerText>
    //       {( person,department) => (
    //         <React.Fragment>
    //           <EuiPanel paddingSize="s" className="eui-displayInlineBlock">
    //             <span>
    //               {person}/{department}
    //             </span>
    //           </EuiPanel>

    //         </React.Fragment>
    //       )}
    //     </EuiInnerText>
    //       </EuiFormRow>

    //       <EuiFormRow label="Email">
    //       <EuiInnerText>
    //       {( email,name) => (
    //         <React.Fragment>
    //           <EuiPanel paddingSize="s" className="eui-displayInlineBlock">
    //           <a href="mailto:`${email}`?subject=`${name}`">{email}</a>,
    //           </EuiPanel>

    //         </React.Fragment>
    //       )}
    //     </EuiInnerText>
    //       </EuiFormRow>
    //       <EuiFormRow label="Phone Number">
    //       <EuiInnerText>
    //       {( number) => (
    //         <React.Fragment>
    //           <EuiPanel paddingSize="s" className="eui-displayInlineBlock">
    //           <a href="tel:`${number}`">{number}</a>
    //           </EuiPanel>

    //         </React.Fragment>
    //       )}
    //     </EuiInnerText>
    //       </EuiFormRow> 
    //     </EuiForm>
    //   );
    // return (
    //     <div>
    //       <EuiPopover
    //         id="formPopover"
    //         ownFocus
    //         button={button2}
    //         isOpen={isPopover2Open}
    //         closePopover={closePopover2}>
    //         <div style={{ width: '300px' }}>{formContent}</div>
    //       </EuiPopover>
    //     </div>
    //   );
    // };
    return (
      <>
      </>
    )
  };
}


export default PopupContacts