import React from 'react'
import Layout from '../components/layout'
import Intro from '../components/intro'
import SEO from '../components/seo'
import Carousel from '../components/carousel'
import Features from '../components/features'
import Card from '../components/card'
import { MDBRow } from 'mdbreact'
import Bulletin from '../components/bulletin'
import { useServiceData } from '../utils/useServiceData'

const App = () => {
  const { allMarkdownRemark, allFile } = useServiceData()

  // Format the data for easy access
  const services = []
  const images = {}
  allFile.nodes.forEach(({id, childImageSharp}) => {
    images[id] = {
      fluid: childImageSharp.fluid
    }
  })

  allMarkdownRemark.edges.forEach(({node}) => {
    const item = {
      key: node.frontmatter.sequence,
      title: node.frontmatter.title,
      image: images[node.frontmatter.cardimage.id],
      link: node.frontmatter.link,
      description: node.frontmatter.description
    }

    services.push(item)
  })

  return (
    <>
      <Layout>
        <SEO title="Home" keywords={[`Eastwood`, `medical centre`, `GP`, `Aspire`, `online booking`]} />
        <Carousel imgList={services}/>
        <Intro />
        <main>
          <Features/>
          <section id="cardSection">
            <h2 className="h1-responsive text-center font-weight-bold mb-5">
              Our services
            </h2>
            <MDBRow className="m-0" center>
              {services.map((item) => 
                <Card 
                  key={item.key}
                  image={item.image}
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

export default App
