import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const ActusPageTemplate = ({ title, panneauPocketUrl, content, contentComponent }) => {
  const PageContent = contentComponent || Content;
  console.log(panneauPocketUrl);
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-four-fifths is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
              
            </div>
          </div>
          <iframe className="column is-narrow" src={panneauPocketUrl} title="title" frameborder="0" width="330" height="500" />
        </div>
      </div>
    </section>
  );
};

ActusPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  panneauPocketUrl: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const ActusPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ActusPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        panneauPocketUrl={post.frontmatter.panneauPocketUrl}
        content={post.html}
      />
    </Layout>
  );
};

ActusPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ActusPage;

export const ActusPageQuery = graphql`
  query ActusPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        panneauPocketUrl
      }
    }
  }
`;
