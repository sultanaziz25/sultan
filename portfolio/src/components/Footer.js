import React from 'react'
import {graphql, StaticQuery} from "gatsby";

class Footer extends React.Component {
  render() {
    const socialMedia = this.props.data.allConfigJson.edges[0].node.siteContent.socialMedia,
          mailId = socialMedia.mailId,
          mailto = `mailto:${mailId}`,
          twitter = socialMedia.twitter,
          insta = socialMedia.insta,
          github = socialMedia.github,
          linkedin = socialMedia.linkedin,
          facebook = socialMedia.facebook;

    return (
      <section id="footer">
        <div className='container'>
          <header className='major footer'>
            <h2>Want to connect?</h2>
          </header>
          <ul className="icons">
            {
              mailId &&
              (<ul><li>{socialMedia.mailId}</li></ul>)
            }

            {
              github &&
              <li><a href={github} target='_blank' className="icon alt fa-github"><span
                  className="label">GitHub</span></a></li>
            }

            {
              linkedin &&
              <li><a href={linkedin} target='_blank' className="icon alt fa-linkedin-square"><span
                  className="label">LinkedIn</span></a></li>
            }

            {
              twitter &&
              <li><a href={twitter} target='_blank' className="icon alt fa-twitter"><span
                  className="label">Twitter</span></a></li>
            }

            {
              insta &&
              <li><a href={insta} target='_blank' className="icon alt fa-instagram"><span
                  className="label">Instagram</span></a></li>
            }

            {
              facebook &&
              <li><a href={facebook} target='_blank' className="icon alt fa-facebook-square"><span
                  className="label">Facebook</span></a></li>
            }
          </ul>
          {
            mailId &&
            <ul className='actions uniform'>
              <li><a href={mailto} className='button special'>Drop me a mail</a></li>
            </ul>
          }
        </div>
      </section>
    )
  }
}

const query = graphql`
    query {
         allConfigJson{
            edges{
                node{
                    siteContent{                        
                        socialMedia {
                          mailId
                          twitter
                          insta
                          github
                          linkedin
                          facebook
                        }
                    }                       
                }       
            }
        } 
    }      
`
export default () => <StaticQuery
    query={query}
    render={data => <Footer data={data}/>}
/>
