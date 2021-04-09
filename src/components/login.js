import React from "react"
import { Link, navigate } from "gatsby"
import { setUser, isLoggedIn, getUser } from "../services/auth"
import loginStyles from "../styles/main-login.css"
import ForloopLogo from "../img/forloop-logo.png";
import ForgotPassword from "./forgotPassword"
import ResentConfirmationLink from "./resentConfirmationLink"
// import { browserHistory } from 'react-router'
class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isFailedLogin: false,
    isForgotPassword: false,
    isConfirmationResent:false,
    errorMessage:"",
  }

  // componentDidMount() {
  //   super.componentDidMount();

  //   this.onScrollNearBottom(this.scrollToLoad);

  //   this.backListener = browserHistory.listen(location => {
  //     if (location.action === "POP") {
  //     navigate("/")
  //     }
  //   });
  // }

  // componentWillUnmount() {
  //   super.componentWillUnmount();
  //   // Unbind listener
  //   this.backListener();
  // }



  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
      isFailedLogin: false,
      errorMessage:""
    })
  }

  loginGetToken(AUTH_URL){
    fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem("token", json.token)
        setUser({
          user: json.user,
        })
        if (getUser()) {
          this.setState({
            isFailedLogin: true,
            errorMessage:" Please check email and password, then try again."
          })
        } else {
          this.setState({
            isFailedLogin: false,
            errorMessage:""
          })
          navigate(`/search`)
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({
          errorMessage:error.message,
          isFailedLogin: true,
        })
      })
  }

checkIfEmailConfirmed(CONFIRM_CHECK_URL, AUTH_URL){

  fetch(CONFIRM_CHECK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(this.state),
  })
    .then(res => res.json())
    .then(json => {
      this.setState({
          isConfirmed: json.status,
        })
        if(json.status)
          this.loginGetToken(AUTH_URL);
        else
        this.setState({
          isConfirmationResent: true
        })
     
    })
    .catch(error => {
      console.log(error)
      this.setState({
        errorMessage:error.message,
        isFailedLogin: true,
      })
    })
}

  handleLogin = event => {
    const CONSTANTS = require("../../CONSTANTS.json")
    const AUTH_URL = CONSTANTS.CORE_DOMAIN + "/token-auth/"
    const CONFIRM_CHECK_URL = CONSTANTS.CORE_DOMAIN + "/users/emailconfirmcheck/"

    event.preventDefault()
    this.checkIfEmailConfirmed(CONFIRM_CHECK_URL,AUTH_URL);
   
  }


  navigatetoForgotPassword = event => {
   this.setState({isForgotPassword: true})
  }


  render(props) {
    if (isLoggedIn()) {
      navigate(`/search`)
    }


    return (
      <div>
      { this.state.isConfirmationResent? <ResentConfirmationLink onClickBack={()=>this.setState({isConfirmationResent: false})} onClickOk={this.props.onClickOk} email={this.state.email}/> :
       <div>
         {this.state.isForgotPassword ? <ForgotPassword onClickBack={()=>this.setState({isForgotPassword: false})} onClickOk={this.props.onClickOk}/> :
        
        
       <div>

        {this.state.isFailedLogin ? (
          <p style={{ color: `red` }}>{this.state.errorMessage?this.state.errorMessage:"Something went wrong."} </p>
        ) : null}
        <form method="post" onSubmit={this.handleLogin}>
        <a href="https://www.forloop.com.au" target="_blank" class="forloop-link"></a>  
        {/*<img src={ForloopLogo} alt="" className="logo-airline" /> */}
          <p>Please enter your credentials in order to access.</p>
          <p>Don't have an account? Register
            <a style={{ textDecoration: "underline" }} onClick={this.props.onClickRegister}> here</a>
          </p>
          <input type="text" name="email" placeholder="eMail" onChange={this.handleUpdate} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleUpdate}
          />

          <button className="btn-airline" >LOGIN </button>
        <br/>

          <p>
           <a style={{ textDecoration: "underline" }} onClick={this.navigatetoForgotPassword}> Forgot password?</a>
        </p>
        </form>
      </div>
        }
        </div>
      }
      </div>
    )
  }
}

export default Login
