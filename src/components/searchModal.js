import React from "react"
import { ReactiveBase, DataSearch, SingleList } from '@appbaseio/reactivesearch';
import { Popover, OverlayTrigger, Container, Button, Row, Col } from 'react-bootstrap';

class SearchModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // TODO GET THIS FROM GRAPHQL/ELASTICSEARCH
            "mro_type": [
                "Capability",
                "Line",
                "Base",
                "Engine",
                "Repair",
                "LG",
                "Parts",
                "Parts",
                "Logistic",
                "Logistic",
                "Labs"
            ],
            "engines": [
                "Engine",
                "CF6",
                "CFM56",
                "GE90",
                "GP7200",
                "GENX",
                "CFM",
                "GE9X",
                "CF34",
                "RR",
                "RB211",
                "RR500",
                "RR300",
                "IAE",
                "RR250",
                "MTR390",
                "XWB"
            ],
            "ac_types": [
                "B737",
                "B747",
                "B767",
                "B777",
                "B777X",
                "B787",
                "BBJ",
                "B717",
                "A319",
                "A320",
                "A321",
                "A330",
                "A350",
                "A380",
            ]
        }
    }

    render() {
        const popover = (
            <Popover id="popover-basic">
                <Popover.Content>
                    {this.search_content()}
                </Popover.Content>
            </Popover>
        );

        const Example = () => (
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <Button>Click me to see</Button>
            </OverlayTrigger>
        );

        return (<Example />)

    }

    search_content() {

        const mro_types = this.state.mro_type.map((item) =>
            <option>{item}</option>
        );

        const ac_types = this.state.ac_types.map((item) =>
            <option>{item}</option>
        )

        const engines = this.state.engines.map((item) =>
            <option>{item}</option>
        )

        return (
            <ReactiveBase
                app="supplierprovider_search"
                url="http://localhost:9200/"
            >
                <Container fluid>
                    <Row>
                        <Col>Search by flight or tail</Col>
                        <Col>
                            <DataSearch componentId="flight_sensor" dataField="name.raw" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>Global MRO Search</Col>
                        <Col>Live weather</Col>
                    </Row>
                    <Row>
                        <Col>
                            <SingleList
                                componentId="port_sensor"
                                dataField="name.raw"
                                size={100}
                            />
                        </Col>
                    </Row>
                </Container>
            </ReactiveBase>
        );
    }
}


export default SearchModal