import React from "react";
import FooterBottom from "./FooterBottom";

class Footer extends React.Component {
  render(): React.ReactNode {
    return (
      <>
      <div className="dextools-footer-section">
        <div className="footer-area">
          <FooterBottom/>
        </div>
      </div></>
    );
  }
}

export default Footer;
