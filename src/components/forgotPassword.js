import React from "react"

import { Col, Row } from "react-bootstrap";
class ForgotPassword extends React.Component {
  state = {
    email: "",
    errorMessage: "",
    isFailed: false,
    isSuccefullySent :false
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  
  handleOk = event =>{
    event.preventDefault()
    const CONSTANTS = require("../../CONSTANTS.json")
    const APP_URL =CONSTANTS.FRONT_DOMAIN

    window.location.replace(APP_URL)
  }
  handleResetPassword = event => {


    this.setState({isSuccefullySent:false, isFailed:false});
    
    const CONSTANTS = require("../../CONSTANTS.json")
    const RESETPASSWORD_URL =CONSTANTS.CORE_DOMAIN +
      "/reset_password/"
    event.preventDefault()
    fetch(RESETPASSWORD_URL, {
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
       
         {/* <img src={AirlineLogo} alt="" className="logo-airline" /> */}
          <p>
            An email has been sent to {this.state.email} containing a link to reset
              your password
          </p>

          <button className="btn-airline" onClick={this.props.onClickOk}>Ok </button>
        </form>
        : <form method="post" onSubmit={ this.handleResetPassword}>
      {/* <img src={AirlineLogo} alt="" className="logo-airline" /> */ } 
        <p>
          We will send you an email that will allow you to reset your
          password.
        </p>

        <input
          type="text"
          name="email"
          placeholder="eMail"
          onChange={this.handleUpdate}
        />
<Row>

<Col>
<button className="btn-airline" onClick={this.props.onClickBack}>Back </button>
</Col>
<Col>
<button className="btn-airline">Send Email </button>
</Col>
</Row>
     
        
      </form>}
      </div>
    )
  }
}

export default ForgotPassword
