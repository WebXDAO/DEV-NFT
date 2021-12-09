import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import React from 'react'

import PropTypes from 'prop-types'

import { Provider } from 'next-auth/client'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object
}

export default MyApp
