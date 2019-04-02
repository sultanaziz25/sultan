import React from 'react'
import '../assets/scss/main.scss'

import Banner from '../components/Banner'
import Footer from '../components/Footer'

class Layout extends React.Component {
  render() {
    return (
      <div className='body'>
        <Banner/>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}

export default Layout;
