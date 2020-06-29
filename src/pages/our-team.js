import React from 'react'
import Layout from '../components/layout'
import Content from '../components/content'
import bgImg from "../images/blue-bg.jpg"
import Background from '../components/background'
import TeamList from '../components/team-list'

const OurTeam = () => (
  <Layout>
    <Background bgImg={bgImg}>
      <Content title='Our team'>
        <TeamList/>
      </Content>
    </Background>
  </Layout>
)

export default OurTeam