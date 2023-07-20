import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class GalerieRollTemplate extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-4" key={post.id}>
              <Link
                className="title has-text-primary is-size-4"
                to={post.fields.slug}
              >

                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        style: {
                          width: '100%',
                          height: 200,
                          objectFit: 'cover'
                        }

                      }}
                    />

                  </div>
                ) : null}

              </Link>
              <span style={{
                position: 'relative',
                color: 'white',
                fontSize: 16,
                left: 4,
                bottom: 32,
                textShadow: ['2px 0 #000',
                  '-2px 0 #000',
                  '0 -2px #000',
                  '1px 1px #000',
                  '-1px -1px #000',
                  '1px -1px #000',
                  '-1px 1px #000'
                ]
              }}>
                {post.frontmatter.title}
              </span>
            </div>
          ))
        }
      </div>
    )
  }
}

GalerieRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function GalerieRoll() {
  return (
    <StaticQuery
      query={graphql`
        query GalerieRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [fields___slug] }
            filter: { frontmatter: { templateKey: { eq: "galerie-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 500
                        quality: 100
                        layout: CONSTRAINED
                      )

                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <GalerieRollTemplate data={data} count={count} />}
    />
  );
}
