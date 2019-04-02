import React, { Component } from 'react'
import {graphql, StaticQuery} from "gatsby";
import PropTypes from "prop-types";

class Misc extends Component {
  state = { current: 'intro' }

  render() {
    const { current } = this.state
      const texts = this.props.data.allConfigJson.edges[0].node.miscTexts;

    const TextSection = () => (
      <div className="col-6">
        <header className="major">
          <h2>{texts[current].header}</h2>
        </header>
        <p>{texts[current].p1}</p>
        {texts[current].bullets && <ul>
          {texts[current].bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
        </ul>}
        {texts[current].links && (<p>
          {texts[current].links.map(link => (
            <a href={link.href} key={link.href} className='miscellaneous' target='_new'>{link.text}</a>
          ))}
        </p>)}
      </div>
    )

    return (
      <section id="two" className="main style2">
        <div className="grid-wrapper">
          <div className="col-6">
            <ul className="major-icons">
              <li><span className="icon style5 major cursor fa-map"
                        onClick={() => this.setState({ current: 'location' })}/></li>
            </ul>
          </div>
          {TextSection()}
        </div>
      </section>
    )
  }
}

Misc.propTypes = {
  data: PropTypes.object.isRequired,
}

const query = graphql`
    query {
         allConfigJson{
            edges{
                node{
                    miscTexts{
                        intro {
                            header
                            p1
                        }
                        location {
                            header
                            p1
                        }
                    }
                }       
            }
        } 
    }      
`
export default () => <StaticQuery
    query={query}
    render={data => <Misc data={data}/>}
/>