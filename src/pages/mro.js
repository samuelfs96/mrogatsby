import React from "react"
// import { graphql } from "gatsby"
import Layout from "../components/layout"
import mroStyles from "../styles/mro.module.scss"

// export const query = graphql`
//   query {
//     allMongodbMroMroMro {
//       edges {
//         node {
//           name_text
//           website_text
//           ports {
//             address
//             city
//             country
//             location
//             state
//             zip_code
//           }
//         }
//       }
//     }
//   }
// `

export default function Mro({ data }) {
  console.log(data)
  return (
    <Layout>
      {/* <Head title="MRO List" />
      {data.allMongodbMroMroMro.edges.map((edge, index) => {
        return (
          <div key={index} className={mroStyles.mro}>
            <h3><a href={edge.node.website_text}>{edge.node.name_text}</a></h3>
            {edge.node.ports.map((port, id) => {
              return (
                <div key={id} className={mroStyles.port}>
                  <ul>
                  <li>Port: {port.city}</li>
                  <li>Address: {port.address}</li>
                  <li>Location: {port.location}</li>
                  <li>State: {port.state}</li>
                  <li>ZIP: {port.zip_code}</li>
                  <br/>
                  </ul>
                </div>
              )
            })}
          </div>
        )
      })} */}
    </Layout>
  )
}