import React from 'react'
import Layout from '../components/layout'
import Content from '../components/content'
import AppBrowser from '../components/appointment-browser'

const Appointments = () => (
  <Layout>
    <Content title='Appointment browser'>
      <AppBrowser/>
    </Content>
  </Layout>
)

export default Appointments