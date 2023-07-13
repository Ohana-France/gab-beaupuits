import * as React from "react";

import Layout from "../../components/Layout";
import GalerieRoll from "../../components/GalerieRoll";

export default class GalerieIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        
        <section className="section">
          <div className="container">
            <div className="content">
              <h1
                className="has-text-weight-bold is-size-1"
                style={{
                  padding: "0.2rem",
                }}
              >
                Galerie
              </h1>
              <h3 style={{
                  padding: "0.2rem",
                }}>
                Des photos insolites ou anciennes de notre village dans vos tiroirs ? N’hésitez pas à nous les faire parvenir. 
              </h3>
              <GalerieRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
