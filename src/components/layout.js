import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import Navbar from './navbar'
import Footer from './footer'
import "./layout.css"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00a3c1'
    },
    secondary: {
      main: '#e3622f'
    }
  }
})

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Navbar/>
    {children}
    <Footer />
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
