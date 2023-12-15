import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const ConseilPageTemplate = ({ title, content, contentComponent, members }) => {
    const PageContent = contentComponent || Content;

    return (
        <section className="section section--gradient">
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="section">
                            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                                {title}
                            </h2>
                            {
                                members.map((member, index) => {
                                    return (
                                        <div style={{
                                            borderRadius: 10,
                                            borderWidth: "1px",
                                            borderColor: "#eeeeee",
                                            borderStyle: "solid",
                                            overflow: "hidden",
                                            display: "flex",
                                            margin: 10,
                                            marginLeft: (member.rank - 1) * 150,
                                            width: 600,
                                            boxShadow: "0px 0px 10px -3px rgba(0,0,0,0.1)"
                                        }}
                                            key={"member-" + index}>
                                            <img
                                                src={member.image.publicURL}
                                                style={{
                                                    width: 130,
                                                    height: 150,
                                                    objectFit: 'cover'
                                                }}
                                                alt={member.name} />
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                padding: 10
                                            }}>
                                                <span style={{ flex: 1 }}><b>{member.name}</b></span>
                                                <span style={{ flex: 1 }}><b>{member.title}</b></span>
                                                <span style={{ flex: 1 }}><b>Profession :</b> {member.profession}</span>
                                                <span style={{ flex: 1 }}><b>Comissions :</b> {member.commissions.join(", ")}</span>

                                            </div>
                                        </div>);
                                })
                            }
                            <PageContent className="content" content={content} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

ConseilPageTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
    members: PropTypes.any
};

const ConseilPage = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <ConseilPageTemplate
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                content={post.html}
                members={post.frontmatter.members}
            />
        </Layout>
    );
};

ConseilPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ConseilPage;

export const conseilPageQuery = graphql`
  query ConseilPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        members {
            name
            rank
            title
            profession
            commissions
            image { 
                publicURL
            }
        }
      }
    }
  }
`;
