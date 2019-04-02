import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

/*
 * Component to provide link of CV
 */

const Resume = () => (
  <StaticQuery
    query={graphql`
      query {
        resume: file(sourceInstanceName: {eq: "content"}, relativePath: {eq: "assests/CV.pdf"}) {
            publicURL
        }
      }
    `}
    render={data => {
        return <a href={data.resume.publicURL} target='_blank'>Resume</a>
    }}
  />
)
export default Resume;
