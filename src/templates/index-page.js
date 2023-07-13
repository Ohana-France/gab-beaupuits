import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import { getImage } from "gatsby-plugin-image";
import FullWidthImage from "../components/FullWidthImage";

// eslint-disable-next-line
export const IndexPageTemplate = ({ title, image, panneauPocketUrl }) => {
  const fullWidthImage = getImage(image) || image;
  console.log(fullWidthImage);
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column">
            <FullWidthImage  img={fullWidthImage} title={title}/>
          </div>
          <iframe className="column is-narrow" style={{width:316}} src={panneauPocketUrl} title="title" frameborder="0" width="316" height="500" />
        </div>
      </div>
    </section>
  );
};

IndexPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  panneauPocketUrl: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const IndexPage = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(data);
  return (
    <Layout>
      <IndexPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        panneauPocketUrl={post.frontmatter.panneauPocketUrl}
        content={post.html}
        image={post.frontmatter.image}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const IndexPageQuery = graphql`
{
  markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
    html
    frontmatter {
      title
      panneauPocketUrl
      image {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
      }
    }
  }
}
`;
