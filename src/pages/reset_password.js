import React from "react"

import ForFinding from "../img/For-Finding.svg";
import ChangePassword from "../components/changePassword";



class Reset_password extends React.Component {

   state={
    isValid:false,
    isFailed:false,
    errorMessage:"",
    token:"",
   }



  handleValidateToken(tokenInp){

  const CONSTANTS = require("../../CONSTANTS.json")
  const VALIDATETOKEN_URL = CONSTANTS.CORE_DOMAIN + "/reset_password/validate_token/"

  fetch(VALIDATETOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({"token":tokenInp}),
  })
  .then(response => {
    response.json().then(json => {
      // alert(response.status)
      if (response.status === 200) {
        this.setState({isValid:true})

      }else{
        // alert("not 200")

        this.setState({isFailed:true}) ;
        if((json.status !== undefined)&& (json.status === "notfound")){
         this.setState({errorMessage:"Token is not found."});
        }else{
          if(json.email !== undefined){
            this.setState({errorMessage:json.email+""});
          }
          if(this.errorMessage===""){
            this.setState({errorMessage:"Something went wrong."});
          }
        }
    }
    })
  })
    .catch(error => {
      // alert(error)
      this.setState({
        isFailed: true,
        errorMessage:"Something went wrong.("+error.message+")"
      })
    })
 }



 async componentDidMount(){
  // alert(this.props)
  let search = this.props.location.search; // could be '?foo=bar'
  let params2 = new URLSearchParams(search);
  let tokenIn = params2.get('token'); // token
  this.setState({token: tokenIn, })
  // alert(tokenIn);
  const response= await this.handleValidateToken(tokenIn);
  this.setState({token: tokenIn, })
 }


 render(props) {
   if(this.state){
    const { isValid,
    errorMessage,
    token}=this.state;
    return (


       <html lang="en">
  <head>
  <link rel="shortcut icon" href="../img/favicon.png" />
  <title>FOR-FindingMRO</title>
    <meta charset="utf-8"/>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <link rel="stylesheet" type="text/css" href="styles/bootstrap/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css"/>

    <link rel="stylesheet" type="text/css" href="styles/jquery-ui.css"/>
    <link rel="stylesheet" type="text/css" href="styles/datatables.css"/>
    <link rel="stylesheet" type="text/css" href="styles/responsive.dataTables.css"/>
    <link rel="stylesheet" type="text/css" href="styles/select2.css" />
    <link rel="stylesheet" href="styles/icons.css"/>
    <link rel="stylesheet" href="styles/main-login.css"/>
  </head>
  <body className="login">
    <header>
      <div className="container">
        <div className="row">
          <div className="w-100 d-flex justify-content-center" >
          <img className="logo-forloop" style={{ width: "375px" }} src={ForFinding} alt=""/>
          </div>
        </div>
      </div>
    </header>

    <section>

      <article className="login d-flex align-items-center h-100">
        <div className="container">
          <div className="bg-panel withShadow text-center">
         {
           isValid?
           <ChangePassword token={token}/>
          : <p style={{ color: `red` }}>
            {errorMessage}" Please try again"
          </p>}

          </div>
        </div>
      </article>
    </section>

    <footer>
      <div className="container">
        <hr/>
        <div className="row">
          <div className="col-md-6 text-center text-md-left"><p>© 2021 Forloop</p></div>
          <div className="col-md-6 text-center text-md-right"><p>Artificial intelligence by <a href="https://www.forloop.com.au" target="_blank" class="forloop-link"></a></p></div>
        </div>
      </div>
    </footer>


  </body>
  </html>
  );
  }
}
}

export default Reset_password