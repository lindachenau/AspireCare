import React from 'react'
import Layout from '../components/layout'
import Content from '../components/content'
import AppBrowser from '../components/appointment-browser'
import titleImg from '../images/bg10.jpg'

const PageAppBrowser = () => (
  <Layout>
    <Content title='Appointment browser' titleImg={titleImg}>
      <AppBrowser/>
    </Content>
  </Layout>
)

export default PageAppBrowser