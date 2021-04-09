import React, {useState} from "react"
import Login from "../components/login";
import Signup from "../components/signup";
import ForFinding from "../img/For-Finding.svg";
import Helmet from "react-helmet"
export default function Home() {

  const [isSignup, setIsSignup] = useState( false)

  let mdl;
  if (isSignup) {
    mdl = <Signup onClickLogin={() => setIsSignup(false)}/>;
  } else {
    mdl =  <Login onClickRegister={() => setIsSignup(true)} /> ;
  }
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
          {mdl}

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