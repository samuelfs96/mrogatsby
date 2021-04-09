import React from "react"

import { Col, Row } from "react-bootstrap";
class ResentConfirmationLink extends React.Component {
  state = {
    email: this.props.email,
    errorMessage: "",
    isFailed: false,
    isSuccefullySent :false
  }


  
  handleOk = event =>{
    event.preventDefault()
    const CONSTANTS = require("../../CONSTANTS.json")
    const APP_URL =CONSTANTS.FRONT_DOMAIN

    window.location.replace(APP_URL)
  }
  handleResent = event => {


    this.setState({isSuccefullySent:false, isFailed:false});
    
    const CONSTANTS = require("../../CONSTANTS.json")
    const RESENT_URL =CONSTANTS.CORE_DOMAIN+
      "/users/emailconfirmationresent/"
    event.preventDefault()
    fetch(RESENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
    .then(response => {
      response.json().then(json => {
        // alert(response.status)
        if (response.status === 200) {
          this.setState({isSuccefullySent:true, isFailed:false})
         
        }else{
          // alert("not 200")
        this.setState({
          isFailed: true, isSuccefullySent:false
        });
        // alert(json)
        this.setState({
          errorMessage: json.email+". Please try again."
        })
        // alert(this.state.errorMessage)
        if(this.state.errorMessage===""){
          this.setState({errorMessage : "Something went wrong. Please try again."})
         }


      }
      })
  })
      .catch(error => {
        // alert(error)
        this.setState({
          isFailed: true, isSuccefullySent:false,
        })
      })
  }

  render(props) {
   
    return (
      <div>
      <a href="https://www.forloop.com.au" target="_blank" class="forloop-link"></a>  
        { this.state.isSuccefullySent ? null : 
          (
           this.state.isFailed ? (
              <p style={{ color: `red` }}>
              {this.state.errorMessage}
              </p>
             ):null 
             ) }
       
        {this.state.isSuccefullySent?
        <form method="get" onSubmit={this.handleOk}>
       
         
          <p>
            An email has been resent to {this.state.email} containing the confirmation link. 
          </p>

          <button className="btn-airline" onClick={this.props.onClickOk}>Ok </button>
        </form>
        : <form method="post" onSubmit={ this.handleResent}>
      
        <p>
          To login successfully, your account should be confirmed. Please check your emails for confirmation.
        </p>

       
<Row>

<Col>
<button className="btn-airline" onClick={this.props.onClickBack}>Back </button>
</Col>
<Col>
<button className="btn-airline">resent</button>
</Col>
</Row>
     
        
      </form>}
      </div>
    )
  }
}

export default ResentConfirmationLink
