import React, {
    useCallback,
    useMemo,
    useState,
    useEffect,
} from "react"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { Icon } from "leaflet"
import leafletCustomStyle from "../styles/leaflet_custom.css"
import MarkerClusterGroup from 'react-leaflet-markercluster';

import "@elastic/eui/dist/eui_theme_light.css"

import { gql } from "@apollo/client"
import { getDistance } from "geolib"

import {
    withSearchkit,
    useSearchkitQuery,
    useSearchkit
} from "@searchkit/client"

import {
    FacetsList,
} from "@searchkit/elastic-ui"

import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiPageSideBar,
    EuiTitle,
    EuiText,
    EuiHorizontalRule,
    EuiButton,
    EuiFlexGroup,
    EuiFlexItem,
    EuiRange,
    EuiFieldSearch,
    EuiSpacer,
    EuiBadge,
    EuiCard,
    EuiOverlayMask,
    EuiModal,
    EuiModalBody,
    EuiFlyout,
    EuiFlyoutHeader,
    EuiFlyoutBody,
    EuiButtonIcon,
    EuiDataGrid,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiPopover,
    EuiForm,
    EuiFormRow,
    EuiPanel,
    EuiButtonEmpty
} from "@elastic/eui"

import { Row, Col } from "react-bootstrap"

import { htmlIdGenerator } from "@elastic/eui/lib/services"

import Layout from "../components/layout"

import { getUser } from "../services/auth"

var _ = require('lodash')

require('react-leaflet-markercluster/dist/styles.min.css')

const query = gql`
  query resultSet($query: String, $filters: [FiltersSet], $page: PageInput) {
    results(query: $query, filters: $filters) {
      summary {
        total
        appliedFilters {
          id
          label
          value
        }
        query
      }
      hits(page: $page) {
        page {
          total
          totalPages
          pageNumber
          from
          size
        }
        items {
          id
          fields {
            uid
            name
            address
            latitude
            longitude
            note
            ac_type
            engine_type
            capability_type
            contacts {
                number
                department
                person
                email
            }
            full_capabilities{
                capability_type
                ac_type
                engine_type
                slot_availability
                etops
                certification_type
                b2
                rat_test
                other_nearest_suppliers
                capability_24_7
                on_call_support
                cost_details
                call_out_charge
                deep_clean
                hangar_availability
                spare_wheel_availability
                exterior_wash
                BSI_capability
                paint
                jacking_facility
                platform
                cherry_picker
                deicing_cart
                lift_equipment
                eng_run
                composite_repairs
                ndt
                engine_analysis
            }
          }
        }
      }
      facets {
        id
        type
        label
        display
        entries {
          id
          label
          count
        }
      }
    }
  }
`

// Melbourne
// const position = [-37.8136, 144.9631]
// Italy
const position = [42.803, 11.981]

const Index = () => {
    const [rotation, setRotation] = useState(0)
    const [translateX, setTranslateX] = useState(0)
    const [airport, setAirport] = useState("")

    const [airportLoc, setAirportLoc] = useState({ latitude: 0, longitude: 0 })
    const [isGeoFilterActive, setIsGeoFilterActive] = useState(false)

    const [isAirportFound, setIsAirportFound] = useState(true)
    const [distance, setDistance] = useState(50)
    const [resultSize, setResultSize] = useState(0)
    const [emptyData, setEmptyData] = useState(false)

    const api = useSearchkit()
    api.setPage({ size: 10000 })
    const { data, loading } = useSearchkitQuery(query)

    const [keyword, setKeyword] = useState(api.getQuery())

    useEffect(() => {
        getResultSize(data)
        checkFiltersApplied(data)
    });

    const getResultSize = (data) => {
        let result = data?.results.hits.items
            .filter(item => applyFilter(item))
            .map(item => item.fields.uid)
            .filter((value, index, self) => self.indexOf(value) === index)
        setResultSize(result?.length)
    }

    // Check if the applied filters are the same in the result.
    // If not, clear all data from the map.
    const checkFiltersApplied = (data) => {
        if (!loading) {
            let resultFilters = data?.results.summary.appliedFilters
                .map(item => _.pick(item, 'id'))
            let filters = api.getFilters().map(item => _.pick(item, 'id'))
            console.log("resultFilters: ", resultFilters)
            console.log("filters: ", filters)

            let resultQuery = data?.results.summary.query
            let query = api.getQuery()
            console.log("resultQuery: ", resultQuery)
            console.log("query: ", query)

            if (resultQuery !== query || !_.isEqual(resultFilters, filters) || !isAirportFound) {
                setEmptyData(true)
            } else {
                setEmptyData(false)
            }
        }
    }

    const Facets = FacetsList([])
    const mapIcon = new Icon({
        iconUrl: require("../img/marker.png"),
        iconSize: [26, 39],
    })

    const onChangeDistance = e => {
        setDistance(e.target.value)
    }

    const onChangeAirport = e => {
        setAirport(e.target.value)
        if (airport === "") {
            setIsAirportFound(true)
        }
    }

    const onChangeKeyword = e => {
        setKeyword(e.target.value)
    }

    const applyFilter = item => {
        // Clear all result or not
        if (emptyData) {
            return false
        }

        // Apply geo filter on the result list
        if (isGeoFilterActive) {
            const supplierproviderLoc = {
                latitude: item.fields.latitude,
                longitude: item.fields.longitude,
            }

            const actDist = getDistance(airportLoc, supplierproviderLoc) / 1000

            if (actDist > distance) {
                console.log(
                    item.fields.name + " is outside the range:" + actDist + "km"
                )
                return false
            } else {
                console.log(item.fields.name + " is inside the range:" + actDist + "km")
                return true
            }
        } else {
            return true
        }
    }

    const reset = e => {
        e.preventDefault()
        setIsGeoFilterActive(false)
        setIsAirportFound(true)
        setAirport("")
        setDistance(50)
        setKeyword("")
        api.setQuery('')
        api.setPage({ size: 10000 })
        api.search()
    }

    const submit = e => {
        const CONSTANTS = require("../../CONSTANTS.json")
        const SEARCH_URL = CONSTANTS.CORE_DOMAIN + "/search/airport/?search=" + airport
        e.preventDefault()
        if (airport.trim().length === 0) {
            setIsAirportFound(true)
            setIsGeoFilterActive(false)
            console.log("No airport input.")
        } else {
            fetch(SEARCH_URL, {
                method: "GET",
                headers: {
                    Authorization:
                        "Basic " +
                        btoa(
                            CONSTANTS.CORE_ADMIN_USER + ":" + CONSTANTS.CORE_ADMIN_PASSWORD
                        ),
                },
            })
                .then(res => res.json())
                .then(json => {
                    console.log("Response Json: ", json)
                    if (json.length > 0) {
                        setAirportLoc({
                            latitude: json[0].latitude,
                            longitude: json[0].longitude,
                        })
                        setIsGeoFilterActive(true)
                        setIsAirportFound(true)
                        console.log("airport found: ", json[0].name)
                    } else {
                        setIsGeoFilterActive(false)
                        setIsAirportFound(false)
                        console.log("no response")
                    }
                })
        }

        if (keyword.length > 0) {
            api.setQuery(keyword)
            api.setPage({ size: 10000 })
            api.search()
        }

        console.log("Geo Location Filter is Activated? ", isGeoFilterActive)
        console.log(data)
    }

    const [isFlyoutVisible, setIsFlyoutVisible] = useState(false)

    const closeFlyout = () => setIsFlyoutVisible(false)

    const showFlyout = () => setIsFlyoutVisible(true)

    // const [items, setItems] = useState([])

    // const addItem = item => {
    //     setItems([...items, { item }])
    // }

    const [MROs, setMROs] = React.useState(new Map())
    const [isPopupOpen, setIsPopupOpen] = useState(new Map());

    const closePopover = (key) => {
        setIsPopupOpen(prev => new Map([...prev, [key, false]]))
    }

    const togglePopover = (key) => {
        const new_val = !isPopupOpen.get(key)
        setIsPopupOpen(prev => new Map([...prev, [key, new_val]]))
    }

    const addMRO = (key, value) => {
        setMROs(prev => new Map([...prev, [key, value]]))
    }

    const delMRO = (key) => {
        setMROs((prev) => {
            const updatedMROs = new Map(prev);
            updatedMROs.delete(key);
            return updatedMROs;
        });
    }

    const delAllMRO = () => {
        MROs.forEach((mro, id) => {
            delMRO(id)
        })
    }

    const [toggled_map, set_toggled_map] = useState(new Map());

    const addToggled = (key, value) => {
        set_toggled_map(prev => new Map([...prev, [key, value]]))
    }

    const [contacts, setContacts] = useState([])

    const popupContacts = () => {

        const contact_info = (contact) => (
            <>
                <EuiHorizontalRule margin="xs" />
                <EuiFormRow label="Contact Person/Dept">
                    <EuiPanel paddingSize="s" className="eui-displayInlineBlock">
                        <span>
                            {contact.person}
                        </span>
                    </EuiPanel>
                </EuiFormRow>
                <EuiFormRow label="Email">
                    <EuiPanel paddingSize="s" className="eui-displayInlineBlock">

                        {getUser().user ?
                            <a href={"mailto:" + contact.email + "?subject= Request for Information from " + getUser().user.organization}>{contact.email}</a>
                            :
                            <a href={"mailto:" + contact.email + "?subject= Request for Information from a FindingMRO User"}>{contact.email}</a>
                        }

                    </EuiPanel>
                </EuiFormRow>
                <EuiFormRow label="Phone Number">
                    <EuiPanel paddingSize="s" className="eui-displayInlineBlock">
                        <a href={"tel:" + contact.number}>{contact.number}</a>
                    </EuiPanel>
                </EuiFormRow>
                <EuiHorizontalRule margin="xs" />
            </>
        )

        return (
            <EuiForm>
                {contacts.map(contact_set => (
                    contact_set.fields ? contact_set.fields.contacts.map(contact =>
                        contact_info(contact)
                    )
                        :
                        (contact_info(contact_set))
                ))}
            </EuiForm >
        );
    };

    const RightSideBar = () => {

        let MROs_list = [];
        MROs.forEach((mro, id) => {
            MROs_list.push(id);
        });

        return (
            <>
                {MROs_list.map(id => (
                    <>
                        <EuiCard
                            size="l"
                            title={
                                <>
                                    <EuiFlexGroup alignItems="center">
                                        <EuiFlexItem>
                                            {MROs.get(id)[0].fields.name}
                                        </EuiFlexItem>
                                    </EuiFlexGroup>
                                    <EuiButtonIcon
                                        color="text"
                                        size="s"
                                        onClick={() => { delMRO(id) }}
                                        iconType="cross"
                                        aria-label="close-individual"
                                        style={{
                                            position: "relative",
                                            top: -35,
                                            right: -140
                                        }}
                                    />
                                </>

                            }
                            display="plain"
                            description={
                                <>
                                    <EuiFlexGroup>
                                        <EuiFlexItem>
                                            <h4>AC Types: &nbsp;</h4>
                                            <EuiFlexGroup justifyContent="center">
                                                {
                                                    Array.from(new Set(MROs.get(id).map(mro => (
                                                        mro.fields.ac_type
                                                    )).flat())).map(ac => (
                                                        <EuiFlexItem grow={false}>
                                                            <EuiBadge
                                                                color="secondary"
                                                            >
                                                                {ac}
                                                            </EuiBadge>
                                                        </EuiFlexItem>
                                                    ))
                                                }
                                            </EuiFlexGroup>
                                        </EuiFlexItem>
                                    </EuiFlexGroup>
                                    <EuiFlexGroup>
                                        <EuiFlexItem>
                                            <h4>Engines: &nbsp;</h4>
                                            <EuiFlexGroup justifyContent="center">
                                                {
                                                    Array.from(new Set(MROs.get(id).map(mro => (
                                                        mro.fields.engine_type
                                                    )).flat())).map(eng => (
                                                        <EuiFlexItem grow={false}>
                                                            <EuiBadge
                                                                color="secondary"
                                                            >
                                                                {eng}
                                                            </EuiBadge>
                                                        </EuiFlexItem>
                                                    ))
                                                }
                                            </EuiFlexGroup>
                                        </EuiFlexItem>
                                    </EuiFlexGroup>
                                    <EuiFlexGroup>
                                        <EuiFlexItem>
                                            <h4>Capabilities: &nbsp;</h4>
                                            <EuiFlexGroup justifyContent="center">
                                                {
                                                    Array.from(new Set(MROs.get(id).map(mro => (
                                                        mro.fields.capability_type
                                                    )).flat())).map(cap => (
                                                        <EuiFlexItem grow={false}>
                                                            <EuiBadge
                                                                color="secondary"
                                                            >
                                                                {cap}
                                                            </EuiBadge>
                                                        </EuiFlexItem>
                                                    ))
                                                }
                                            </EuiFlexGroup>
                                        </EuiFlexItem>
                                    </EuiFlexGroup>
                                    <EuiFlexGroup>
                                        <EuiFlexItem>
                                            <h4>Airport: &nbsp;</h4>
                                            <EuiFlexGroup justifyContent="center">
                                                <EuiFlexItem grow={false}>
                                                    <EuiBadge
                                                        color="warning"
                                                    >
                                                        {MROs.get(id)[0].fields.address}
                                                    </EuiBadge>
                                                </EuiFlexItem>
                                            </EuiFlexGroup>
                                        </EuiFlexItem>
                                    </EuiFlexGroup>

                                </>
                            }
                            footer={
                                <EuiFlexGroup justifyContent="spaceEvenly">
                                    <EuiFlexItem grow={false}>
                                        <EuiButton
                                            isSelected={toggled_map.get(id)}
                                            fill={toggled_map.get(id)}
                                            iconType={toggled_map.get(id) ? 'starFilled' : 'starPlusEmpty'}
                                            onClick={() => {
                                                addToggled(id, toggled_map.has(id) ? !toggled_map.get(id) : true);
                                            }}>
                                            <EuiText>Add to compare list</EuiText>
                                        </EuiButton>
                                    </EuiFlexItem>
                                    <EuiFlexItem grow={false}>
                                        <EuiPopover
                                            id={id}
                                            ownFocus={false}
                                            button={
                                                <EuiButton
                                                    fill
                                                    minWidth={100}
                                                    iconSide="right"
                                                    // iconType={require("../../static/mail_icon.svg")}
                                                    onClick={() => {
                                                        togglePopover(id)
                                                        setContacts(MROs.get(id))
                                                    }}
                                                >
                                                    Contact
                                                </EuiButton>
                                            }
                                            isOpen={isPopupOpen.get(id)}
                                            closePopover={() => { closePopover(id) }}
                                        >
                                            {popupContacts()}
                                        </EuiPopover>
                                    </EuiFlexItem>
                                    {/* <EuiFlexItem grow={false}>
                                        <EuiButtonIcon
                                            color="danger"
                                            iconType="trash"
                                            iconSize="l"
                                            onClick={() => {
                                                delMRO(id);
                                            }}>
                                        </EuiButtonIcon>
                                    </EuiFlexItem> */}
                                </EuiFlexGroup>
                            }
                        />
                        <EuiHorizontalRule />
                    </>
                ))
                }
                <Comparison />
            </>
        )
    }

    const Comparison = () => {

        let MROs_list = [];
        MROs.forEach((mro, id) => {
            if (toggled_map.get(id)) {
                mro.forEach((row, id_row) => {
                    const flattened_row = { ...row.fields, ...row.fields.full_capabilities[id_row] }
                    MROs_list.push(flattened_row)
                })
            }
        })

        let columns_to_drop = []

        if (MROs_list.length > 0) {

            Object.keys(MROs_list[0]).forEach(key => {

                let this_key_value = false

                MROs_list.forEach(mro => {

                    if (mro !== null && mro[key] !== null && mro[key] !== "") {
                        this_key_value = true
                    }

                    this_key_value = false || this_key_value

                })

                if (!this_key_value) {
                    columns_to_drop.push(key)
                }
            })
        }

        const ComparisonTable = () => {

            const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

            let columns = MROs_list.length > 0 ?
                Object.keys(MROs_list[0]).map((key) => (
                    { id: key, display: <EuiText style={{ textTransform: 'capitalize' }}> {key.replace(/_/g, " ")} </EuiText> }
                ))
                :
                [
                    { id: "name" },
                    { id: "ac_type" },
                    { id: "engine_type" },
                    { id: "capability_type" },
                    { id: "number" },
                ]

            columns = columns.filter((item) => (
                item.id !== "longitude" && item.id !== "latitude" &&
                item.id !== "__typename" && item.id !== "contacts" &&
                item.id !== "full_capabilities" && item.id !== "uid" &&
                !columns_to_drop.includes(item.id)
            ));

            columns = [{
                id: "contacts",
                display: <EuiText style={{ textTransform: 'capitalize' }}>Contacts</EuiText>,
                initialWidth: 120
            }].concat(columns)

            const onChangeItemsPerPage = useCallback(
                pageSize =>
                    setPagination(pagination => ({
                        ...pagination,
                        pageSize,
                        pageIndex: 0,
                    })),
                [setPagination]
            )
            const onChangePage = useCallback(
                pageIndex => setPagination(pagination => ({ ...pagination, pageIndex })),
                [setPagination]
            )

            const [sortingColumns, setSortingColumns] = useState([])
            const onSort = useCallback(
                sortingColumns => {
                    setSortingColumns(sortingColumns)
                },
                [setSortingColumns]
            )

            const [visibleColumns, setVisibleColumns] = useState(() =>
                columns.map(({ id }) => id)
            )

            const renderCellValue = useMemo(() => {
                return ({ rowIndex, columnId }) => {
                    if (MROs_list.hasOwnProperty(rowIndex)) {

                        const cel_val = MROs_list[rowIndex][columnId]

                        if (cel_val === null) {
                            return (
                                <EuiButtonIcon
                                    color="danger"
                                    iconType="crossInACircleFilled"
                                />
                            )
                        }
                        else if (cel_val === "") {
                            return (
                                <EuiButtonIcon
                                    color="danger"
                                    iconType="crossInACircleFilled"
                                />
                            )
                        }
                        else if (cel_val === "Y") {
                            return (
                                <EuiButtonIcon
                                    color="primary"
                                    iconType="checkInCircleFilled"
                                />
                            )
                        }
                        else if (columnId === "contacts") {
                            return (
                                <EuiFlexGroup
                                    justifyContent="center"
                                    style={{ marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0 }}>
                                    <EuiButtonIcon
                                        iconSize="l"
                                        iconType="email"
                                        // textProps={{style: "width"}}
                                        onClick={() => {

                                            setIsContactModalVisible(true)
                                            setContacts(cel_val)
                                        }}
                                    >
                                    </EuiButtonIcon>
                                </EuiFlexGroup>
                            )
                        }
                        else if (typeof cel_val === "object") {
                            return (
                                <EuiFlexGroup alignItems="stretch">
                                    {
                                        cel_val.map(cap => (
                                            <EuiFlexItem grow={false}>
                                                <EuiBadge
                                                    // iconType="checkInCircleFilled"
                                                    color="secondary"
                                                >
                                                    {cap}
                                                </EuiBadge>
                                            </EuiFlexItem>
                                        ))
                                    }
                                </EuiFlexGroup>
                            )
                        }
                        return cel_val
                    }
                }
            }, [])



            return (
                <EuiDataGrid
                    width={window.innerWidth}
                    columns={columns}
                    columnVisibility={{ visibleColumns, setVisibleColumns }}
                    rowCount={MROs_list.length}
                    renderCellValue={renderCellValue}
                    inMemory={{ level: "sorting" }}
                    sorting={{ columns: sortingColumns, onSort }
                    }
                    pagination={{
                        ...pagination,
                        onChangeItemsPerPage: onChangeItemsPerPage,
                        onChangePage: onChangePage,
                    }}
                    toolbarVisibility={{
                        showFullScreenSelector: false
                    }}
                />
            )
        }

        const [isModalVisible, setIsModalVisible] = useState(false)
        const closeModal = () => setIsModalVisible(false)
        const showModal = () => setIsModalVisible(true)

        const [isContactModalVisible, setIsContactModalVisible] = useState(false)

        let modal

        let modal_contacts


        if (isModalVisible) {
            modal = (
                <EuiOverlayMask>
                    <EuiModal
                        onClose={closeModal}
                        maxWidth={window.innerWidth}
                    >
                        <EuiModalHeader>
                            <EuiModalHeaderTitle>MRO Capability Matrix</EuiModalHeaderTitle>
                        </EuiModalHeader>
                        <EuiModalBody>
                            <ComparisonTable />
                        </EuiModalBody>
                    </EuiModal>
                </EuiOverlayMask>
            )
        }
        if (isContactModalVisible) {
            modal_contacts = (
                <EuiOverlayMask>
                    <EuiModal
                        onClose={() => setIsContactModalVisible(false)}
                    >
                        <EuiModalBody>
                            {popupContacts()}
                        </EuiModalBody>
                    </EuiModal>
                </EuiOverlayMask>
            )
        }
        return (
            <>
                <EuiButton onClick={showModal} fill fullWidth={true}>
                    <EuiText>Compare MROs</EuiText>
                </EuiButton>
                {modal}
                {modal_contacts}
            </>
        )
    }

    return (
        <Layout>
            {isFlyoutVisible ? (
                <EuiFlyout
                    onClose={closeFlyout}
                    size="s"
                >
                    <EuiFlyoutHeader>
                        <EuiTitle size="m">
                            <EuiFlexGroup
                                justifyContent="spaceEvenly"
                            >
                                <EuiFlexItem grow={false}>
                                    <h2>My List</h2>
                                </EuiFlexItem>
                                <EuiFlexItem grow={false}>
                                    <EuiButtonIcon
                                        color="danger"
                                        iconType="trash"
                                        iconSize="l"
                                        onClick={() => {
                                            delAllMRO();
                                        }}>
                                    </EuiButtonIcon>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiTitle>
                    </EuiFlyoutHeader>
                    <EuiFlyoutBody>
                        <EuiPageBody component="div">
                            <EuiPageContent>
                                <EuiPageContentHeader>
                                    <EuiPageContentHeaderSection>
                                        <EuiTitle size="s">
                                            <h2>{MROs.size} Results</h2>
                                        </EuiTitle>
                                    </EuiPageContentHeaderSection>
                                </EuiPageContentHeader>
                                <EuiPageContentBody>
                                    <RightSideBar data={MROs} />
                                    <EuiHorizontalRule />
                                </EuiPageContentBody>
                            </EuiPageContent>
                        </EuiPageBody>
                    </EuiFlyoutBody>
                </EuiFlyout>
            ) : (
                    <></>
                )}
            <>
                <MapContainer
                    center={position}
                    zoom={4}
                    scrollWheelZoom={true}
                    maxZoom={19}
                    minZoom={2}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MarkerClusterGroup>
                        {data?.results.hits.items
                            .filter((value, index, self) => self.findIndex(a => a.fields.uid === value.fields.uid) === index)
                            .filter(item => applyFilter(item))
                            .map(hit => (
                                <Marker
                                    position={{
                                        lat: hit.fields.latitude,
                                        lon: hit.fields.longitude,
                                    }}
                                    icon={mapIcon}
                                >
                                    <Popup>
                                        <EuiCard
                                            key={hit.fields.uid}
                                            title={hit.fields.name}
                                            display="plain"
                                            description={
                                                <>
                                                    <h5>Capabilities:</h5>
                                                    <EuiFlexGroup>
                                                        {hit.fields.capability_type?.map(capability => (
                                                            <EuiFlexItem>
                                                                {capability}
                                                            </EuiFlexItem>
                                                        ))}
                                                    </EuiFlexGroup>
                                                    <h5>Airport:</h5>
                                                    <EuiFlexGroup>
                                                        <EuiFlexItem>
                                                            {hit.fields.address}
                                                        </EuiFlexItem>
                                                    </EuiFlexGroup>
                                                    <EuiHorizontalRule />
                                                    <EuiButton
                                                        fill
                                                        onClick={() => {
                                                            const result = data.results.hits.items.filter(mro => (
                                                                mro.fields.uid === hit.fields.uid
                                                            ))
                                                            addMRO(hit.fields.uid, result)
                                                            showFlyout()
                                                        }}
                                                    >
                                                        Shortlist
                                                </EuiButton>
                                                </>
                                            }
                                        />
                                    </Popup>
                                </Marker>
                            ))}
                    </MarkerClusterGroup>
                </MapContainer>

                <div class="clicker">
                    <img
                        src={require("../img/left.svg")}
                        alt="left arrow"
                        onClick={() => {
                            setRotation((rotation + 180) % 360)
                            if (translateX !== 0) {
                                setTranslateX(0)
                            } else {
                                setTranslateX(-145)
                            }
                            console.log("rotation: " + rotation)
                            console.log("translateX: " + translateX)
                        }}
                        style={{ transform: `rotate(${rotation}deg)` }}
                    />
                </div>

                <div id="searchid" style={{ transform: `translateX(${translateX}%)` }}>
                    <EuiPage id="euipage">
                        <EuiPageSideBar class="search-bar">
                            <div>
                                <h2 class="search-title">Global MRO Search</h2>
                            </div>

                            <div class="row">
                                <div class="col-lg-4">
                                    <EuiFieldSearch
                                        placeholder="Search Airport"
                                        value={airport}
                                        onChange={onChangeAirport}
                                        isClearable
                                    />
                                    {isAirportFound ? null : (
                                        <div>
                                            <EuiSpacer size="s" />
                                            <p id="warning-s">Could not find the airport. </p>
                                        </div>
                                    )}
                                    <EuiSpacer size="m" />
                                    <span id="span-s">Distance from Port(km)</span>
                                    <EuiRange
                                        id={htmlIdGenerator()()}
                                        min={0}
                                        max={250}
                                        value={distance}
                                        onChange={onChangeDistance}
                                        showLabels
                                        showValue
                                    />
                                </div>

                                <div class="col-lg-8">
                                    <Facets data={data?.results} loading={loading} />
                                </div>

                            </div>

                            <div class="row">
                                <div class="divider">
                                    <EuiHorizontalRule margin="xs" />
                                    <EuiSpacer size="m" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-4">
                                    <h4 id="span-or">OR</h4>
                                </div>

                                <div class="col-lg-8">
                                    <EuiFieldSearch
                                        placeholder="Search Keyword"
                                        value={keyword}
                                        onChange={onChangeKeyword}
                                        isLoading={loading}
                                        onSearch={() => {
                                            api.setQuery(keyword)
                                            api.setPage({ size: 10000 })
                                            api.search()
                                        }}
                                        isClearable
                                        aria-label="Search Keyword"
                                    />
                                    <EuiSpacer size="m" />
                                    <Row>
                                        <Col>
                                            <EuiButtonEmpty
                                                class="btn btn-outline-secondary"
                                                id="reset-button"
                                                isLoading={loading}
                                                onClick={reset}
                                            >
                                                Reset
                                            </EuiButtonEmpty>
                                        </Col>
                                        <Col>
                                            <button
                                                class="btn btn-primary btn-go font-weight-normal w-100"
                                                onClick={submit}
                                            >
                                                Go
                                            </button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {resultSize > 0 ?
                                            (<p id="result-size">{resultSize} results found.</p>)
                                            :
                                            (<p id="result-size">0 results found.</p>)
                                        }
                                    </Row>
                                </div>
                            </div>
                        </EuiPageSideBar>
                    </EuiPage>
                </div>

                <EuiButton
                    fill
                    minWidth={30}
                    title={isFlyoutVisible ? 'arrowRight' : 'arrowLeft'}
                    aria-label={isFlyoutVisible ? 'arrowRight' : 'arrowLeft'}
                    iconType={isFlyoutVisible ? 'arrowRight' : 'arrowLeft'}
                    iconSize="xxl"
                    onClick={() => {
                        showFlyout();
                    }}
                    style={{
                        position: "absolute",
                        top: 100,
                        right: 0
                    }}
                />
            </>
        </Layout >
    )
}

export default withSearchkit(Index)
