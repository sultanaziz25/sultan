import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

/*
 * Component to display pic of user
 */

const DisplayPicture = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(sourceInstanceName: {eq: "content"}, relativePath: {eq: "assests/dp.png"}) {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => {
      return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
    }}
  />
)
export default DisplayPicture;
