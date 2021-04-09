import React from 'react'

import Header from './header'

import { Container, Row, Col } from 'react-bootstrap';
import Helmet from "react-helmet";
const Layout = (props) => {

    return (
        <>
        <Helmet>
        <link rel="shortcut icon" href="../img/favicon.png" />
          <title>FOR-FindingMRO</title>
          </Helmet>
        <Container fluid>
            <Row style={{ paddingBottom: "60px" }}>
                <Header />
            </Row>
            <Row>
                {props.children}
            </Row>
        </Container>
        </>
    )
}

export default Layout