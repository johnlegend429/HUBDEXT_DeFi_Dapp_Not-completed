import React from "react";
import StepKYC from "../components/modules/stepKYC";
import PastPresalesInRow from "../components/presales/PastInRow";
import LiveInRow from "../components/presales/LiveInRow";
import NextInRow from "../components/presales/ComingInRow";
import ApplyIdo from "../components/common/ApplyIdo";
import LogosPartners from "../components/modules/carouselLogos";

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   renderSettings: {
//     preserveAspectRatio: 'xMidYmid slice'
//   }
// };

class Home extends React.Component<any, any> {

  componentDidMount() {
    (window as any).triggerSlider();
  }

  render() {
    return (
      <div id="home-page">
        <div id="sc-banner" className="sc-banner-hero banner-bg position-relative">
          <div className="container text-center">
            <div className="row align-items-left justify-content-center">
              <div className="col-sm-6 hero">
                <h1 className="banner-title wow fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="0.7s">Welcome to <br></br>DEXT FORCE</h1>
                  <div  className="description wow fadeInUp"
                  data-wow-delay="0.4s"
                  data-wow-duration="0.7s">
                    <p>Join the best group of traders in DEFI</p>
                    <p>Rewards, staking, presales & more</p>
                    <p><a className="linkdexthome" /* target="_blank" */ href="https://www.dextools.io/app/en/ether/pair-explorer/0xa29fe6ef9592b5d408cca961d0fb9b1faf497d6d">Powered by DEXT token</a></p>
                 {/*    <p className="ecosystem">Ecosystem of:</p> */}
                  </div>
                  <div  className="ecosystem-brands wow fadeInUp"
                  data-wow-delay="0.4s"
                  data-wow-duration="0.7s">
                    <img src="/assets/images/ecosystem/dextools.svg" alt="dextforce launcher" />
                    <img className="dextforce" src="/assets/images/ecosystem/dextforce.svg" alt="dextforce launcher" />
                    <img src="/assets/images/ecosystem/logo.png" alt="dextforce launcher" />
                  </div>
              </div>
              <div className="col-sm-6 video-col order-first order-md-last">
                <div
                  className="banner-slider-inner wow fadeInUp"
                  data-wow-delay="1s"
                  data-wow-duration="1.5s"
                >
                  <div
                    className="sc-carousel owl-carousel"
                    data-loop="true"
                    data-items="1"
                    data-margin="0"
                    data-autoplay="false"
                    data-hoverpause="true"
                    data-autoplay-timeout="5000"
                    data-smart-speed="1000"
                    data-dots="true"
                    data-nav="false"
                    data-nav-speed="true"
                    data-center-mode="false"
                    data-mobile-device="1"
                    data-mobile-device-nav="false"
                    data-mobile-device-dots="true"
                    data-ipad-device="1"
                    data-ipad-device-nav="false"
                    data-ipad-device-dots="true"
                    data-ipad-device2="1"
                    data-ipad-device-nav2="false"
                    data-ipad-device-dots2="false"
                    data-md-device="1"
                    data-md-device-nav="false"
                    data-md-device-dots="true"
                  >
                   {/*  <LivePresalesInRectangle/> */}
                   
                  </div>
                  <img src="/assets/images/bg/intro.gif" className="rocketHero" alt="rocket" />
                </div>
                
   {/*              <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="https://dextpad.decentr4l.com/videos/earth.webm"
                    type="video/webm"
                  />
                </video> */}
                {/* <Lottie options={{animationData: texto, ...defaultOptions }} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="dextools-about-section pb-80 md-pb-45 simple-glow-one">
          <div className="container">
            <div
              className="pt-10 md-pt-80 heading-area align-items-center d-flex justify-content-center wow fadeInUp mb-30"
              data-wow-delay="0.2s"
              data-wow-duration="0.4s"
            >
              <div className="sec-heading we-are">
                <h2 className="title">Join DEXT FORCE</h2><img src="/assets/images/bg/boot.gif" className="bot" alt="rocket" />
              </div>
            </div>
            <div className="participate-area row participate-item d-flex wow fadeInUp">
              <StepKYC/>
            </div>
            <LogosPartners/>
          </div>
        </div>
          <div id="projects-section">
          <video playsInline autoPlay muted loop>
              <source
              /* src="assets/videos/space_1.webm"
                type="video/webm" */
                src="assets/videos/space_1.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
          </video>
            <div className="dextools-project-section main-project-area simple-glow-two">
              <div className="container">
                <div className="sec-inner align-items-center d-flex justify-content-center mb-50">
                  <div className="sec-heading text-center">
                    <div className="sub-inner">
                      <span className="sub-title">Discover Projects</span>
                    </div>
                    <h2 className="mb-0 title xs-pb-20">The Launcher</h2>
                  </div>
                </div>
                <div className="row align-items-center">
                  {/* <ComingInBox></ComingInBox> */}
                  <div className="col-sm-6 video-col order-first order-md-last">
                   <h3 className="homeh3">An elite consortium of industry-leading decision makers</h3>
                   <h4 className="home">Our council and internal team of analysts vet projects via a strict due diligence process.</h4>
                  <div className="dextools-btn-area-up-past left">
                    <ul>
                      <li>
                        <a className="view-more black-shape" href="/idos">
                          <span className="btn-text">Go to launcher</span>
                          <i className="icon-arrow_right"></i>
                        </a>
                      </li>
                    </ul>
                </div>
                  </div>  
                  <div className="col-sm-6 video-col order-first order-md-last text-center">
                   <img src="/assets/images/bg/launcher.png" className="homeBounce" alt="rocket" />
                  </div>
                </div>

              </div>
            </div>
            <div className="dextools-previous-section pb-90 md-pb-50 simple-glow-three">
              <div className="container">
                <div
                  className="sec-inner align-items-center d-flex justify-content-center wow fadeInUp mb-50"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.4s"
                >
                  <div className="sec-heading text-center">
                    <div className="sub-inner">
                      <span className="sub-title">Live Projects</span>
                    </div>
                    <h2 className="mb-0 title xs-pb-20">Running IDO</h2>
                  </div>
                </div>
                <div
                  className="row align-items-center"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.4s"
                >
                  <div
                    className="col-md-12 wow fadeInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="0.5s"
                  >
              {/*      <div className="previous-mainmenu mb-15">
                      <ul className="menu-list">
                        <li className="list1">Project name</li>
                        <li className="list2">Chain</li>
                        <li className="list3">Ended</li>
                        <li className="list4">Total Raise</li>
                        <li className="list5">Progress</li>
                      </ul>
                    </div> */}
                    <LiveInRow></LiveInRow>
                    <div className="dextools-btn-area-up-past">
                      <ul>
                        <li>
                          <a className="view-more black-shape" href="/idos">
                            <span className="btn-text">View More</span>
                            <i className="icon-arrow_right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
             </div>
             <div className="dextools-previous-section pb-90 md-pb-50 simple-glow-three">
              <div className="container">
                <div
                  className="sec-inner align-items-center d-flex justify-content-center wow fadeInUp mb-50"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.4s"
                >
                  <div className="sec-heading text-center">
                    <div className="sub-inner">
                      <span className="sub-title">Upcoming Projects</span>
                    </div>
                    <h2 className="mb-0 title xs-pb-20">Next IDO</h2>
                  </div>
                </div>
                <div
                  className="row align-items-center"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.4s"
                >
                  <div
                    className="col-md-12 wow fadeInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="0.5s"
                  >
              {/*      <div className="previous-mainmenu mb-15">
                      <ul className="menu-list">
                        <li className="list1">Project name</li>
                        <li className="list2">Chain</li>
                        <li className="list3">Ended</li>
                        <li className="list4">Total Raise</li>
                        <li className="list5">Progress</li>
                      </ul>
                    </div> */}
                    <NextInRow></NextInRow>
                    <div className="dextools-btn-area-up-past">
                      <ul>
                        <li>
                          <a className="view-more black-shape" href="/idos">
                            <span className="btn-text">View More</span>
                            <i className="icon-arrow_right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
             </div>  
            <div className="dextools-previous-section pb-90 md-pb-50 simple-glow-three">
              <div className="container">
                <div
                  className="sec-inner align-items-center d-flex justify-content-center wow fadeInUp mb-50"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.4s"
                >
                  <div className="sec-heading text-center">
                    <div className="sub-inner">
                      <span className="sub-title">Complete Projects</span>
                    </div>
                    <h2 className="mb-0 title xs-pb-20">Past IDO</h2>
                  </div>
                </div>
                <div
                  className="row align-items-center"
                  data-wow-delay="0.2s"
                  data-wow-duration="0.4s"
                >
                  <div
                    className="col-md-12 wow fadeInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="0.5s"
                  >
              {/*      <div className="previous-mainmenu mb-15">
                      <ul className="menu-list">
                        <li className="list1">Project name</li>
                        <li className="list2">Chain</li>
                        <li className="list3">Ended</li>
                        <li className="list4">Total Raise</li>
                        <li className="list5">Progress</li>
                      </ul>
                    </div> */}
                    <PastPresalesInRow></PastPresalesInRow>
                    <div className="dextools-btn-area-up-past">
                      <ul>
                        <li>
                          <a className="view-more black-shape" href="/idos">
                            <span className="btn-text">View More</span>
                            <i className="icon-arrow_right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dextools-project-section main-project-area simple-glow-two">
              <div className="container">
                <div className="sec-inner align-items-center d-flex justify-content-center mb-50">
                  <div className="sec-heading text-center">
                    <div className="sub-inner">
                      <span className="sub-title">Gain more Dext</span>
                    </div>
                    <h2 className="mb-0 title xs-pb-20">Staking zone</h2>
                  </div>
                </div>
                <div className="row align-items-center">
                  {/* <ComingInBox></ComingInBox> */}
                  <div className="col-sm-6 video-col order-first order-md-last">
                  <img src="/assets/images/bg/staking.png" className="homeBounce" alt="rocket" />
                  </div>  
                  <div className="col-sm-6 video-col order-first order-md-last">
                  <h3 className="homeh3">An elite consortium of industry-leading decision makers</h3>
                   <h4 className="home">Our council and internal team of analysts vet projects via a strict due diligence process.</h4>
                  <div className="dextools-btn-area-up-past left">
                    <ul>
                      <li>
                        <a className="view-more black-shape" href="/idos">
                          <span className="btn-text">Go to staking</span>
                          <i className="icon-arrow_right"></i>
                        </a>
                      </li>
                    </ul>
                </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="dextools-project-section main-project-area simple-glow-two">
              <div className="container">
                <div className="sec-inner align-items-center d-flex justify-content-center mb-50">
                  <div className="sec-heading text-center">
                    <div className="sub-inner">
                      <span className="sub-title">Our Allies</span>
                    </div>
                    <h2 className="mb-0 title xs-pb-20">Farming Pools</h2>
                  </div>
                </div>
                <div className="row align-items-center">
                  {/* <ComingInBox></ComingInBox> */}
                  <div className="col-sm-6 video-col order-first order-md-last">
                   <h3 className="homeh3">An elite consortium of industry-leading decision makers</h3>
                   <h4 className="home">Our council and internal team of analysts vet projects via a strict due diligence process.</h4>
                  <div className="dextools-btn-area-up-past left">
                    <ul>
                      <li>
                        <a className="view-more black-shape" href="/idos">
                          <span className="btn-text">Go to launcher</span>
                          <i className="icon-arrow_right"></i>
                        </a>
                      </li>
                    </ul>
                </div>
                  </div>  
                  <div className="col-sm-6 video-col order-first order-md-last text-center">
                   <img src="/assets/images/bg/launcher.png" className="homeBounce" alt="rocket" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dextools-project-section main-project-area simple-glow-two">
              <div className="container">
                <div className="sec-inner align-items-center d-flex justify-content-center mb-10">
                  <div className="sec-heading text-center">
                  <img src="/assets/images/bg/intro.png" className="gov" alt="rocket" />
                    <div className="sub-inner">
                      <span className="sub-title">Be part of us</span>
                    </div>
                    <h2 className="mb-0 title xs-pb-20">Governance</h2>
                  </div>
                </div>
                <div className="row align-items-center  govern">
                  {/* <ComingInBox></ComingInBox> */}
                  <div className="col-sm-12 video-col order-first order-md-last text-center">
                   <h4 className="gov">Our mission is to bring the highest quality projects together with investors to enable the launch of innovative startups and technology. With this goal, it is the responsibility of the DEXT FORCE Council to act as a governance board to ensure quality and due diligence for the projects we launch.</h4>
                    <div className="features-gov">
                      <div className="gover-features">
                        <img src="/assets/images/bg/member.png" alt="" /> 
                      <span className="one">Be a member</span> 
                        <span className="two">Of the hub</span> 
                      </div>
                      <div className="gover-features">
                        <img src="/assets/images/bg/vote.png" alt="" /> 
                        <span className="one">Participate with us</span> 
                        <span className="two">In important decisions</span> 
                      </div>
                      <div className="gover-features">
                        <img src="/assets/images/bg/quality.png" alt="" /> 
                        <span className="one">In quality projects</span> 
                        <span className="two">DEXT FORCE stamp</span> 
                      </div>
                      <div className="gover-features">
                        <img src="/assets/images/bg/more.png" alt="" /> 
                        <span className="one">And more</span> 
                        <span className="two">...</span> 
                      </div>
                   </div>    
                  <div className="dextools-btn-area-up-past">
                    <ul>
                      <li>
                        <a className="view-more black-shape" href="/idos">
                          <span className="btn-text">Go to governance zone</span>
                          <i className="icon-arrow_right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  </div>  
                </div>
              </div>
            </div>
          <div className="dextools-about-section pb-80 md-pb-45 simple-glow-one">
              <div className="container">
              <div className="sec-inner align-items-center d-flex justify-content-center mb-10">
                  <div className="sec-heading text-center">
                  <img src="/assets/images/bg/intro.png" className="gov" alt="rocket" />
                    <div className="sub-inner">
                      <span className="sub-title">Dext force army</span>
                    </div>
                    <h2 className="mb-0 title xs-pb-20">The community</h2>
                  </div>
                </div>
                <div className="row align-items-center  govern">
                  {/* <ComingInBox></ComingInBox> */}
                  <div className="col-sm-12 video-col order-first order-md-last text-center">
                   <h4 className="gov">Our mission is to bring the highest quality projects together with investors to enable the launch of innovative startups and technology. With this goal, it is the responsibility of the DEXT FORCE Council to act as a governance board to ensure quality and due diligence for the projects we launch.</h4>
                <div className="participate-area row participate-item d-flex wow fadeInUp mt-40">
                  <ul className="social-community">
                    <li>
                      <a href="https://twitter.com/DextForce"><i className="fa fa-twitter fa-lg"></i></a>
                    </li>
                    <li>
                        <a href="https://t.me/DEXToolsCommunity"><i className="fa fa-telegram fa-lg"></i></a>
                      </li>
                      <li>
                        <a href="https://discord.com/invite/PnycaVp"><i className='fa fa-discord'></i></a>
                      </li>
                  </ul>
                </div>
                <LogosPartners/>
               </div>
               </div>
              </div>
            </div>
        <ApplyIdo/>
      </div>
     
    );
  }
}

export default Home;
