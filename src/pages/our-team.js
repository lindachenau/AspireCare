import React from 'react'
import Layout from '../components/layout'
import Content from '../components/content'
import titleImg from '../images/bg8.jpg'
import TeamList from '../components/team-list'

const OurTeam = () => (
  <Layout>
    <Content title='Our team' titleImg={titleImg} tagline='Passion led us here'>
      <TeamList/>
    </Content>
  </Layout>
)

export default OurTeam