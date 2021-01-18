import React, { Component } from 'react'
import Layout from '../components/layout'
import Intro from '../components/intro'
import SEO from '../components/seo'
import Carousel from '../components/carousel'
import Features from '../components/features'
import Card from '../components/card'
import { MDBRow } from 'mdbreact'
import Bulletin from '../components/bulletin'

const imgList = [
  {
    name: require("../images/takingblood.jpg"),
    key: "1",
    alt: "First slide",
    title: "General medicine",
    description: "Our doctors care and listen to your concerns. Achieving better health care one patient at a time.",
    link: "/general-medicine"
  },
  {
    name: require("../images/physio.jpg"),
    key: "2",
    alt: "Second slide",
    title: "Physiotherapy",
    description: "Our physiotherapists provide detailed and comprehensive management of musculoskeletal problems.",
    link: "/physiotherapy"
  },
  {
    name: require("../images/diet.jpg"),
    key: "3",
    alt: "Third slide",
    title: "Dietitians",
    description: "Our dietitians provide practical and achievable diet plans and advice to assist people with diverse needs.",
    link: "/dietitians"
  }
]

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <SEO title="Home" keywords={[`Eastwood`, `medical centre`, `GP`, `Aspire`, `online booking`]} />
          <Carousel imgList={imgList}/>
          <Intro />
          <main>
            <Features/>
            <section id="cardSection">
              <h2 className="h1-responsive text-center font-weight-bold mb-5">
                Our services
              </h2>
              <MDBRow className="m-0" center>
                {imgList.map((item) => 
                  <Card 
                    key={item.key}
                    image={item.name}
                    title={item.title}
                    link={item.link}
                    description={item.description}
                  />
                )}
              </MDBRow>
            </section>
          </main>
        </Layout>
        <Bulletin/>
      </>
    )
  }
}

export default App
