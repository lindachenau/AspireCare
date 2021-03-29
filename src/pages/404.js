import React from 'react'
import Content from '../components/content'
import Layout from '../components/layout'
import { Link } from 'gatsby'

 const Page404 = () => (
  <Layout>
    <Content title='Page not found' titleColor="red">
      <Link to='/'>Home</Link>
    </Content>
  </Layout>
)

export default Page404