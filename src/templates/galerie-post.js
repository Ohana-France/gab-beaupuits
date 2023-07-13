import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const GaleriePostTemplate = ({
  content,
  contentComponent,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};

GaleriePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  images: PropTypes.array
};

const GaleriePost = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(data)
  return (
    <Layout>
      <GaleriePostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Galerie">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

GaleriePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default GaleriePost;

export const pageQuery = graphql`
  query GaleriePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        images {
          childImageSharp {
            gatsbyImageData(
              width: 120
              quality: 100
              layout: CONSTRAINED
            )

          }
        }
      }
    }
  }
    
`;
