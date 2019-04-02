import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

/*
 * Component for banner image and intro.
 */

const Banner = () => (
  <StaticQuery
    query={graphql`
      query {
        allConfigJson{
            edges{
                node{
                    siteContent{                                                                
                        banner {
                          intro
                          p1
                        }
                    }
                }       
            }
        }
      
        placeholderImage: file(sourceInstanceName: {eq: "content"}, relativePath: {eq: "assests/banner.jpg"}) {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => {
        const siteContent = data.allConfigJson.edges[0].node.siteContent;
        const sectionStyle = {
            backgroundImage: 'url(' + data.placeholderImage.childImageSharp.fluid.src + ')',
        };

        return (
          <section id="header" style={sectionStyle}>
            <div className="inner">
             <h1 className='header'>{siteContent.banner.intro}</h1>
                 <div style={{ display: 'flex' }}>
                    <p style={{ width: '25%' }}/>
                    <p style={{ flex: 1 }}>{siteContent.banner.p1}</p>
                    <p style={{ width: '25%' }}/>
                </div>
            </div>
          </section>
      )
    }}
  />
)
export default Banner;
