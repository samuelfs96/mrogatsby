import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import Map from "../components/map"
import Style from "../styles/contact.module.scss"

const center = { lat: -37.818899, lng: 145.037871 }
const mapProps = {
  options: {
    center,
    zoom: 16,
  },
  onMount: map => {
    new window.google.maps.Marker({
      position: center,
      map,
      title: "FORLOOP",
    })
  },
}

export default function Contact() {
    return (
        <Layout>
            <Head title="Contact"/>
            <div>
            <Map id={Style.contactMap} {...mapProps} />
            <h3>FORLOOP</h3>
            <p>Telephone: +61 (0)438 796 811</p>
            <p>Email Address: <a href="mailto:info@forloop.com.au">info@forloop.com.au</a></p>
            <p>Office Adress: 24 Liddiard Street Hawthorn, VIC 3122, Australia</p>
            </div>
        </Layout>
    )
}

