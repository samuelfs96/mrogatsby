import React, { Component } from 'react'
import ForFinding from "../img/For-Finding.svg"
import { navigate } from "gatsby"
import Helmet from "react-helmet"
class EmailConfirm extends Component {
  
  state={
    valid: 0
  }
  handleGoToLogin(event) {
    event.preventDefault();

    navigate(`/`)
  }
  async componentDidMount(){        
    // const confirmationToken = this.props.match.params.confirm
    const CONSTANTS = require("../../CONSTANTS.json")
    const CONF_URL = CONSTANTS.CORE_DOMAIN+'/users/confirm/'
    let search = this.props.location.search; // could be '?foo=bar'
    let params2 = new URLSearchParams(search);
    let confirmationToken = params2.get('confirm'); // token
    if (confirmationToken){
     
      this.setState({confirmationToken:confirmationToken})

      fetch(CONF_URL, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              'confirmationToken': confirmationToken
          })
      })
      .then(res => res.json())
      .then((response) => {
          if (response.status === 'OK'){
              this.setState({valid: 1})
            
          }else if (response.status === 'NOT FOUND'){
              this.setState({valid: 2})
          }
      });
    }
  }

 
  render() {

    return (
        

       <html lang="en">
       <head>
       <Helmet>
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
         </Helmet>
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
               <a href="https://www.forloop.com.au" target="_blank" class="forloop-link"></a> 
               <br/><br/> 
                  {this.state.valid === 1 && (
                           <div role="alert">
                           <form method="get" onSubmit={this.handleGoToLogin}>
                             <p>Email Confirmation Done</p>


                             <button className="btn-airline" >Go To Login </button>
                           </form>
                             </div>
                         )}
                         {this.state.valid === 2 && (
                           <div role="alert">
                             <p>Email Confirmation Failed. Email may be already confirmed or the link is broken.</p>
                           </div>
                         )}
     
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

  
export default EmailConfirm
