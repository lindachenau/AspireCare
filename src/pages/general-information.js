import React from 'react'
import Layout from '../components/layout'
import Content from '../components/content'
import InfoList from '../components/info-list'
import titleImg from '../images/bg6.jpg'

const GeneralInformation = () => (
  <Layout>
    <Content titleImg={titleImg} title='General Information'>
      <InfoList/>
    </Content>
  </Layout>
)

export default GeneralInformation