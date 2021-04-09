import React from "react"
import { Router ,Route} from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/profile"
import Index from "../pages/index"
import Search from "../pages/search"
import Passwordreset from "./reset_password"
import PrivateRoute from "../components/privateRoute"
import EmailConfirm from "./emailConfirm"

import "../styles/global.scss"
import MroUpdate from "./mroUpdate"
import Help from "./help"

var CONSTANTS = require('../../CONSTANTS.json')

const App = () => (
  <Layout>
  <Router>
    <Route exact path="/" component={Index} />
    <PrivateRoute path="/app/profile" component={Profile} />
    <PrivateRoute path="/search" component={Search} />
    <PrivateRoute path="/app/help" component={Help} />
      <Route path="/reset_password/" component={Passwordreset} />
      <Route path="/emailConfirm/" component={EmailConfirm} />
      <Route path="/mroUpdate/:id" >
        <MroUpdate />
      </Route>
    </Router>
  </Layout>
)

export default App
