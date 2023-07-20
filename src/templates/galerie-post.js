import React, { useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Carousel } from "../components/Carousel";
import Modal from 'react-modal';

if (typeof window !== "undefined" && window) {
  Modal.setAppElement('#___gatsby');
}
// eslint-disable-next-line
export const GaleriePostTemplate = ({
  content,
  contentComponent,
  title,
  helmet,
  images
}) => {
  const PostContent = contentComponent || Content;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [height, setHeight] = useState(600);
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
            {images.map((image, index) =>
              <GatsbyImage
                onClick={() => { setIsOpen(true); setSelectedIndex(index); }}
                style={{ padding: 50, margin: 20, width: 300, height: 200, objectFit: 'cover' }}
                image={getImage(image)}
                key={index}
                alt={title + "-" + index} />
            )}
            <Modal isOpen={isOpen}
              onRequestClose={() => setIsOpen(false)}
              onAfterOpen={(modal) => setHeight(modal.contentEl.clientHeight)}
            >
              <Carousel images={images} selectedIndex={selectedIndex} height={height} />
            </Modal>
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
        title={post.frontmatter.title}
        images={post.frontmatter.images}
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
        images {
          childImageSharp {
            gatsbyImageData(
              width: 2000
              quality: 100
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
    
`;
