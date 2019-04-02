import React from 'react'
import Helmet from 'react-helmet'
import Layout from './Layout'
import Gallery from './Gallery'
import Misc from './Misc'
import DisplayPicture from './DisplayPicture';
import Resume from './Resume';
import {graphql, StaticQuery} from "gatsby";

class App extends React.Component {
  state = {}

  ChevronLink = ( toggle, text ) =>
    <span
      className={`link ${this.state[toggle] ? 'chevron-below' : ''}`}
      onClick={() => this.setState({
        showGallery: false,
        showMisc: false,
        [toggle]: !this.state[toggle],
      })}>
    {text}
  </span>

  render() {
    const siteContent = this.props.data.allConfigJson.edges[0].node.siteContent;
    const { showMisc, showGallery } = this.state
    const showResumeOnUI = siteContent.showResume || false
    const showGalleryOnUI = siteContent.showGallery || false
    const showMiscOnUI = siteContent.showMisc || false

    return (
      <Layout>
        <div>
          <Helmet>
            <meta charSet="utf-8"/>
            <title>{siteContent.title}</title>
          </Helmet>

          <section id="aboutMe" className="main style1">
            <div className="grid-wrapper">
              <div className="col-6">
                <header className="major">
                  <h2>About Me</h2>
                </header>
                <p>{siteContent.aboutMe.p1}</p>
                <p>{siteContent.aboutMe.p2}</p>
                <div className='about-me-links'>
                  {showResumeOnUI && <Resume/>}
                  {showGalleryOnUI && this.ChevronLink('showGallery', 'Gallery')}
                  {showMiscOnUI && this.ChevronLink('showMisc', 'Misc')}
                </div>
              </div>
              <div className="col-6">
                <DisplayPicture/>
              </div>
            </div>
          </section>
          {showGallery && <Gallery/>}
          {showMisc && <Misc/>}
        </div>
      </Layout>
    )
  }
}

const query = graphql`
    query {
         allConfigJson{
            edges{
                node{
                    siteContent{
                        title
                        showResume
                        showGallery
                        showMisc
                        aboutMe {
                          p1
                          p2
                        }
                    }                       
                }       
            }
        } 
    }      
`
export default () => <StaticQuery
    query={query}
    render={data => <App data={data}/>}
/>
