import React from 'react'
import Layout from '../components/layout'
import Content from '../components/content'
import InfoList from '../components/info-list'
import titleImg from '../data/general-information/bg6.jpg'

const GeneralInfo = () => (
  <Layout>
    <Content titleImg={titleImg} title='General Information'>
      <InfoList/>
    </Content>
  </Layout>
)

export default GeneralInfo