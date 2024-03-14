import React from "react";


class ApplyIdo extends React.Component {
  render(): React.ReactNode {
    return (
      <>
      <div className="dextools-footer-section apply">
        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <div className="text-left footer-cta-area active-shape hover-shape-inner">
                <h3 className="title mb-15">
                  Apply for project incubation
                </h3>
                <div className="mb-40 dsc md-mb-30">
                  <p className="apply"> If you want to launch an ILO/IDO, It will be <br /> your perfect choice</p>
                </div>
                <a
                  className="wow fadeInUp black-shape"
                  data-wow-delay="0.3s"
                  data-wow-duration="0.5s"
                  href="igo-apply.html"
                >
                  <div className="dextools-btn-area-footer">
                    <ul>
                      <li>
                        <a className="apply-ido black-shape" href="/send-project">
                          <span className="btn-text">Apply For IDO</span>
                          <i className="icon-arrow_right"></i>
                        </a>
                        <img src="/assets/images/bg/botmac.gif" className="botMac" alt="rocket" />
                      </li>
                    </ul>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-5">
              <img src="/assets/images/bg/rocket.png" className="rocketBounce" alt="rocket" />
            </div>
          </div>
        </div>
      </div></>
    );
  }
}

export default ApplyIdo;
