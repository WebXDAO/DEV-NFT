/* eslint-disable react/prop-types */ // Unsure about the types, need @mkubdev's assistance
import React from 'react'
import PropTypes from 'prop-types'

import router from 'next/router'

import Navbar from '../components/nav/dashboard-navbar'

function Layout ({ children, headerName, metamaskAddress, session }) {
  return (
    <>
      <Navbar router={router} headerName={headerName} session={session} />

      <main>{children}</main>

      {/* footer? */}
    </>
  )
}

Layout.propTypes = {
  headerName: PropTypes.string
}

export default Layout
