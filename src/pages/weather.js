import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import WeatherContainer from "../components/weatherContainer.js"

export default function Weather() {
  return (
    <Layout>
      <Head title="Weather" />
      <WeatherContainer />
    </Layout>
  )
}
