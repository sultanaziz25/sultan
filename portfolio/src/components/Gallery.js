import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

class Gallery extends Component {
  state = {
    currentImage: this.props.data.Images.edges[0].node,
    imageIndex: 0,
  }

  changeImage = change => {
    let index = this.state.imageIndex
    const { edges } = this.props.data.Images
    if (!edges[index + change]) {
      index = change === 1 ? -1 : edges.length
    }

    this.setState({ animate: true }, () => {

      this.setState({
        currentImage: edges[index + change].node,
        imageIndex: index + change,
        animate: false,
      })
    })
  }

  render() {
    const { currentImage } = this.state
    const allPhotosDesc = this.props.data.allPhotosJson.edges
    const imageSizes = currentImage.childImageSharp.sizes
    const imageName = currentImage.name
    const imageDesc = allPhotosDesc.find((o)=> {
      return o.node.id === imageName
    });
    const imageDescNode = imageDesc ? imageDesc.node : {}

    return (
      <section id="photography" className="main style2">
        <div className="grid-wrapper">
          <div className='col-3'>
            <header className="major">
              <h2>Gallery</h2>
            </header>
            <CSSTransition
              in={this.state.animate}
              timeout={300}
              classNames="fade"
            >
              <div>
                <p>{imageDescNode.text}</p>
                {imageDescNode.paragraph && <p>{imageDescNode.paragraph}</p>}
                {imageDescNode.link &&
                <a href={imageDescNode.link} target='_new'>More</a>}
              </div>
            </CSSTransition>
          </div>
          <div className="col-9 image-holder">
            <div key={imageName}>
              <div className='left' onClick={() => this.changeImage(-1)}/>
              <Img
                title={imageName}
                alt={imageName}
                sizes={imageSizes}
                className="border-radius"
              />
              <div className='right' onClick={() => this.changeImage(1)}/>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Gallery.propTypes = {
  data: PropTypes.object.isRequired,
}

const query = graphql`
    query imagesQuery {
        allPhotosJson{
            edges{
                node{
                  id
                  text
                  paragraph
                  link
                }       
            }
        }
    
        Images: allFile(
            sort: {order: ASC, fields: [absolutePath]}
            filter: {sourceInstanceName: {eq: "content"}, relativePath: {regex: "/gallery/"}}
        ) {
            edges {
                node {
                    relativePath
                    name
                    childImageSharp {
                        sizes(maxWidth: 1500) {
                            ...GatsbyImageSharpSizes
                        }
                    }
                }
            }
        }
    }
`
export default () => <StaticQuery
  query={query}
  render={data => <Gallery data={data}/>}
/>
