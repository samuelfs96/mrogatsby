// import React, { useState } from "react"

// import {
//     EuiTitle,
//     EuiButton,
//     EuiFlexItem,
//     EuiFlyout,
//     EuiFlyoutBody,
//     EuiCard,
//     EuiIcon,
//     EuiFlexGroup,
//     EuiPageBody,
//     EuiPageHeader,
//     EuiPageHeaderSection,
//     EuiPageContentHeaderSection,
//     EuiPageContent,
//     EuiText,
//     EuiPageContentBody,
//     EuiPageContentHeader,
//     EuiHorizontalRule,
//     EuiBadge,
//     EuiPanel,
// } from '@elastic/eui'

// import {
//     Pagination,
//     SelectedFilters,
// } from '@searchkit/elastic-ui'

// import {
//     useSearchkitQuery,
//     useSearchkit,
//     withSearchkit,
// } from "@searchkit/client"


// import Comparison from "./comparison"


// export const MroCardResults = ({ data }) => {
//     // const [card1Selected, setCard1] = useState(true);
//     // const [card2Selected, setCard2] = useState(false);

//     // const card1Clicked = (e) => {
//     //     setCard1(!card1Selected)
//     // };

//     // const card2Clicked = () => {
//     //     setCard2(!card2Selected);
//     // };

//     // const detailsClicked = (e) => {
//     //     e.stopPropagation();
//     // };

//     const numbers =
//         [
//             {
//                 "id": 1,
//                 "name": "name1",
//                 "val": "val1",
//                 "distance": "5km",
//                 "airport": "CDG",
//                 "capabilities": [
//                     "A320",
//                     "B2",
//                     "test"
//                 ],
//                 "engines": [
//                     "ABC",
//                     "XYZ"
//                 ],
//                 "actypes": [
//                     "ABC",
//                     "XYZ"
//                 ],
//                 "phones": "2341241234",
//                 "email": "test@test.com"
//             },
//             {
//                 "id": 2,
//                 "name": "name2",
//                 "val": "val2",
//                 "distance": "4km",
//                 "airport": "CDG",
//                 "capabilities": [
//                     "A320",
//                     "B2",
//                     "test"
//                 ],
//                 "engines": [
//                     "ABC",
//                     "XYZ"
//                 ],
//                 "actypes": [
//                     "ABC",
//                     "XYZ"
//                 ],
//                 "phones": "2341241234",
//                 "email": "test@test.com"
//             },
//             {
//                 "id": 3,
//                 "name": "name3",
//                 "val": "val3",
//                 "distance": "5km",
//                 "airport": "CDG",
//                 "capabilities": [
//                     "A320",
//                     "B2",
//                     "test"
//                 ],
//                 "engines": [
//                     "ABC",
//                     "XYZ"
//                 ],
//                 "actypes": [
//                     "ABC",
//                     "XYZ"
//                 ],
//                 "phones": "2341241234",
//                 "email": "test@test.com"

//             }
//         ];

//     // const [cardClicked, setCardClicked] = useState(new Map());

//     // const setCardSelected = (k, v) => {
//     //     setCardClicked(cardClicked.set(k, v))
//     // };

//     // const list_funcs = numbers.map((hit) => (

//     // ));

//     // const a = 

//     return (
//         <>
//             {/* {data} */}
//             HERERE
//             {/* {data.map((hit) => (
//                 <>
//                     <EuiFlexItem id={hit.id}>
//                         <EuiCard size="l"
//                             icon={<EuiIcon size="xxl" type="logoIBM" />}
//                             title={hit.name}
//                             description={<>

//                                 <EuiFlexGroup wrap responsive={false} gutterSize="xs">
//                                     <EuiFlexItem>
//                                         <EuiPanel>
//                                             <h4>
//                                                 Capabilities:
//                                         </h4>
//                                             <EuiFlexGroup>
//                                                 {hit.capabilities.map(x =>
//                                                     <EuiFlexItem>
//                                                         <EuiBadge iconType="checkInCircleFilled" color="primary">{x}</EuiBadge>
//                                                     </EuiFlexItem>
//                                                 )}
//                                             </EuiFlexGroup>
//                                         </EuiPanel>
//                                     </EuiFlexItem>
//                                     <EuiFlexItem>
//                                         <EuiPanel>
//                                             <h4>
//                                                 AC Types:
//                                         </h4>
//                                             <EuiFlexGroup>
//                                                 {hit.actypes.map(x =>
//                                                     <EuiFlexItem>
//                                                         <EuiBadge iconType="checkInCircleFilled" color="secondary">{x}</EuiBadge>
//                                                     </EuiFlexItem>
//                                                 )}
//                                             </EuiFlexGroup>
//                                         </EuiPanel>
//                                     </EuiFlexItem>
//                                 </EuiFlexGroup>
//                                 <EuiFlexGroup wrap responsive={false} gutterSize="xs">
//                                     <EuiFlexItem>
//                                         <EuiPanel>
//                                             <h4>
//                                                 Engines:
//                                         </h4>
//                                             <EuiFlexGroup>
//                                                 {hit.engines.map(x =>
//                                                     <EuiFlexItem>
//                                                         <EuiBadge iconType="checkInCircleFilled" color="primary">{x}</EuiBadge>
//                                                     </EuiFlexItem>
//                                                 )}
//                                             </EuiFlexGroup>
//                                         </EuiPanel>
//                                     </EuiFlexItem>
//                                     <EuiFlexItem>
//                                         <EuiPanel>
//                                             <h4>
//                                                 Phone: {hit.phones}
//                                             </h4>
//                                             <h4>
//                                                 Email: {hit.email}
//                                             </h4>
//                                         </EuiPanel>
//                                     </EuiFlexItem>
//                                 </EuiFlexGroup>
//                             </>}
//                             // footer={

//                             // }
//                             selectable={{
//                                 // onClick: cardClicked, { {true}},

//                             }}
//                         />
//                     </EuiFlexItem>
//                     <EuiHorizontalRule />
//                 </>
//             ))
//             } */}
//         </>
//     );
// };
// cons[contactName, setContactName] = useState("")
// cons[contactPerson, setContactPerson] = useState("")
// cons[contactNumber, setContactNumber] = useState("")
// cons[contactEmail, setContactEmail] = useState("")
// cons[contactDepartment, setContactDepartment] = useState("")


// const [isContactsVisible, setIsContactsVisible] = useState(false)

// const closeContacts = () => setIsContactsVisible(false)

// const showContacts = () => setIsContactsVisible(true)

// export const HitsList = ({ data }) => (
//     <>
//         {data.results.hits.items.map(hit => (
//             <EuiFlexGroup gutterSize="xl" key={hit.id}>
//                 <EuiFlexItem>
//                     <EuiFlexGroup>
//                         <EuiFlexItem grow={4}>
//                             <EuiTitle size="xs">
//                                 <h6>{hit.fields.name}</h6>
//                             </EuiTitle>
//                             <p>
//                                 <h4>Capabilities</h4>
//                                 <ul>
//                                     <li>{hit.fields.capability_type}</li>
//                                     <li>{hit.fields.engine_type}</li>
//                                     <li>{hit.fields.ac_type}</li>
//                                 </ul>
//                             </p>
//                             <br />
//                             <p>
//                                 <h4>Phone</h4>
//                                 {hit.fields.number}
//                                 <h4>Email</h4>
//                                 {hit.fields.email}
//                             </p>
//                             <EuiButtonIcon
//                                 title="Contact with this company"
//                                 iconSize="xxl"
//                                 onClick={() => {
//                                     setContactName(hit.fields.name);
//                                     setContactPerson(hit.fields.person);
//                                     setContactDepartment(hit.fields.department);
//                                     setContactNumber(hit.fields.number);
//                                     setContactEmail(hit.fields.email)
//                                     showContacts();
//                                 }}

//                             />
//                             <EuiHorizontalRule />
//                         </EuiFlexItem>
//                     </EuiFlexGroup>
//                 </EuiFlexItem>
//             </EuiFlexGroup>
//         ))}
//     </>
// )


// // export const HitsList = ({ data }) => (
// //     <>
// //         {data?.results.hits.items.map((hit) => (
// //             <EuiFlexGroup gutterSize="xl" key={hit.id}>
// //                 <EuiFlexItem>
// //                     <EuiFlexGroup>
// //                         <EuiFlexItem grow={4}>
// //                             <EuiTitle size="xs">
// //                                 <h6>{hit.fields.name}</h6>
// //                             </EuiTitle>
// //                             <EuiText grow={false}>
// //                                 <p>{hit.fields.iata}</p>
// //                             </EuiText>
// //                             <EuiText grow={false}>
// //                                 <p>{hit.fields.city}</p>
// //                             </EuiText>
// //                             <EuiText grow={false}>
// //                                 <p>{hit.fields.country}</p>
// //                             </EuiText>
// //                             <EuiText grow={false}>
// //                                 <p>{hit.fields.icao}</p>
// //                             </EuiText>
// //                             <EuiText grow={false}>
// //                                 <p>{hit.fields.type}</p>
// //                             </EuiText>
// //                         </EuiFlexItem>
// //                     </EuiFlexGroup>
// //                 </EuiFlexItem>
// //             </EuiFlexGroup>
// //         ))}
// //     </>
// // );

// const RightSidebar = ({ data, loading }) => {

//     let flyout = (
//         <EuiFlyout
//             onClose={() => { }}
//             size="m"
//             aria-labelledby="flyoutSmallTitle">
//             <EuiFlyoutBody>
//                 {data.results.hits.items.map(hit => (<div>{hit.fields.name}</div>))}

//                 <EuiPageBody component="div">
//                     <EuiPageHeader>
//                         <EuiPageHeaderSection>
//                             <EuiTitle size="l">
//                                 <SelectedFilters data={data?.results} loading={loading} />
//                             </EuiTitle>
//                         </EuiPageHeaderSection>
//                     </EuiPageHeader>
//                     <EuiPageContent>
//                         <EuiPageContentHeader>
//                             <EuiPageContentHeaderSection>
//                                 <EuiTitle size="s">
//                                     <h2>{data.results.summary.total} Results</h2>
//                                 </EuiTitle>
//                             </EuiPageContentHeaderSection>
//                         </EuiPageContentHeader>
//                         <EuiPageContentBody>
//                             {/* <HitsList data={data} /> */}
//                             <Comparison />
//                             <EuiHorizontalRule />
//                             <EuiFlexGroup justifyContent="spaceAround">
//                                 <Pagination data={data?.results} />
//                             </EuiFlexGroup>
//                         </EuiPageContentBody>
//                     </EuiPageContent>
//                 </EuiPageBody>
//             </EuiFlyoutBody>
//         </EuiFlyout>
//     );

//     return (
//         // <EuiFlexGroup>
//         // {/* <EuiButton onClick={true ? showFlyout : showFlyout}>Show MROs</EuiButton> */ }
//         <>
//             {isContactsVisible ? (
//                 <PopupContacts
//                     onClose={closeContacts}
//                     name={this.state.name}
//                     person={this.state.person}
//                     department={this.state.department}
//                     email={this.state.email}
//                     number={this.state.number}
//                 />

//             ) : (
//                     <></>
//                 )}

//             {flyout}
//         </>
//         // </EuiFlexGroup>
//     );
// };

// export default withSearchkit(HitsList)
