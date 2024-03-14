import React from "react";
import { Link } from "react-router-dom";
import { DIContainer, withDI } from "../../hooks/withDI";

export type SliderData = DIContainer & PresaleData;

export type PresaleData = {
  id: string;
  minAllocation: string;
  maxAllocation: string;
  token: { id: string, symbol: string, totalSupply: string };
  startDate: string;
  endDate: string;
  softcap: string;
  hardcap: string;
  buyPrice: string;
  projectInfo: string;
};

export type LocksData = {
  id: string;
  vesting: string;
  token: { id: string, symbol: string, totalSupply: string };
  beneficiary: string;
  start: number;
  cliff: number;
  duration: number;
  slicePeriodSeconds: number;
  revocable: Boolean;
  revokedTime: number;
  amount: number;
  end: number;
  claimed: number | null;
  claimable: number | null;
  vestedSeconds: number;
};

interface State {
  logo: string | undefined;
  banner: string | undefined;
  title: string | null;
  ticker: string | null;
  buyToken: string | null;
  telegram: string | null;
  twitter: string | null;
  discord: string | null;
  medium: string | null;
  website: string | null;
  whitelist: "PUBLIC" | "PRIVATE" | null;
}

class Slider extends React.Component<SliderData, State> {
  constructor(props: SliderData) {
    super(props);
    this.state = {
      logo: undefined,
      banner: undefined,
      title: null,
      ticker: null,
      buyToken: "ETH",
      telegram: null,
      twitter: null,
      discord: null,
      medium: null,
      website: null,
      whitelist: null,
    };
  }

  async componentWillMount() {
    const ipfs = this.props.ipfsImpl;
    const wallet = this.props.walletImpl;

    ipfs.getJsonFile<State>(this.props.projectInfo).then((data) => {
      this.setState(data);
    });

    this.setState({
      ticker: this.props.token.symbol,
      whitelist: await wallet.isWhitelisted(this.props.id),
    });
  }

  render(): React.ReactNode {
    return (
      <div className="col-lg-12">
          <div className="related-projects text-center">
          <div className="cover-img">
            <img src={this.state.banner? this.state.banner  : "/assets/images/bg/cover-box-projects.jpg"}
                alt="img" className="img-fluid cover-image"
            />
          </div>
{/*             <img
              src={
                this.state.logo
                  ? this.state.logo
                  : "/assets/images/project/project-image.png"
              }
              alt="logo-project-image"
            /> */}
            <h4 title={this.state.title ? this.state.title : "..."} className="related-project-title mb-8 elipsis">
              <Link to={"/details/" + this.props.id}>
                {this.state.title ? this.state.title : "..."}
              </Link>
            </h4>
            <div className="dsc">
              PRICE ({this.state.ticker ? this.state.ticker : "..."}) =&nbsp;
              {this.props.buyPrice ? this.props.buyPrice : "..."}&nbsp;
              {this.state.buyToken ? this.state.buyToken : "..."}
            </div>
            <a href={"/details/" + this.props.id}>
              <div className="project_details_btn">
                <button className="relatedBtn black-shape">Explore
                  {/* <i className="icon-arrow_right"></i> */}
                </button>                
              </div>  
            </a>      
          </div>      
      </div>

      /*  <div className="col-lg-4 col-md-6">
        <div className="project-item hover-shape-border">
          <div className="project-info d-flex">
            <img
              src={
                this.state.logo
                  ? this.state.logo
                  : "/assets/images/project/project-image.png"
              }
              alt="Project-Image"
            />
            <div className="project-auother">
              <h4 className="mb-10">
                <Link to={"/details/" + this.props.id}>
                  {this.state.title ? this.state.title : "..."}
                </Link>
              </h4>
              <div className="dsc">
                PRICE ({this.state.ticker ? this.state.ticker : "..."}) =&nbsp;
                {this.props.buyPrice ? this.props.buyPrice : "..."}&nbsp;
                {this.state.buyToken ? this.state.buyToken : "..."}
              </div>
            </div>
          </div>
          <div className="project-content">
            <div className="project-header d-flex justify-content-between">
              <div className="heading-title">
                <h4 className="uppercase">
                  {this.props.startDate ? (
                    <Moment fromNow>{Number(this.props.startDate) * 1000}</Moment>
                  ) : (
                    "..."
                  )}
                </h4>
              </div>
              <div className="project-icon">
                <img
                  src="/assets/images/project/project-single-image.png"
                  alt="Project-Image"
                />
              </div>
            </div>
            <div className="project-media">
              <ul className="project-listing">
                <li>
                  Min allocation&nbsp;
                  <span>
                    {this.state.buyToken
                      ? this.props.minAllocation + " " + this.state.buyToken
                      : "..."}
                  </span>
                </li>
                <li>
                  Max allocation&nbsp;
                  <span>
                    {this.state.buyToken
                      ? this.props.maxAllocation + " " + this.state.buyToken
                      : "..."}
                  </span>
                </li>
                <li>
                  Targeted raise&nbsp;
                  <span>
                    {this.state.buyToken
                      ? this.props.hardcap + " " + this.state.buyToken
                      : "..."}
                  </span>
                </li>
                <li>
                  Access type&nbsp;
                  <span>
                    {this.state.whitelist &&
                      this.state.whitelist === "PUBLIC" &&
                      "Public"}
                    {this.state.whitelist &&
                      this.state.whitelist === "PRIVATE" &&
                      "Private"}
                    {!this.state.whitelist && "..."}
                  </span>
                </li>
                <li className="social-share">
                  Social
                  <ul className="social-icon-list">
                    {this.state.telegram && (
                      <li>
                        <a href={this.state.telegram}>
                          <i className="icon-telegram"></i>
                        </a>
                      </li>
                    )}
                    {this.state.twitter && (
                      <li>
                        <a href={this.state.twitter}>
                          <i className="icon-twitter"></i>
                        </a>
                      </li>
                    )}
                    {this.state.discord && (
                      <li>
                        <a href={this.state.discord}>
                          <i className="icon-discord"></i>
                        </a>
                      </li>
                    )}
                    {this.state.medium && (
                      <li>
                        <a href={this.state.medium}>
                          <i className="icon-medium"></i>
                        </a>
                      </li>
                    )}
                    {this.state.website && (
                      <li>
                        <a href={this.state.website}>
                          <i className="icon-world"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <span className="border-shadow shadow-1"></span>
          <span className="border-shadow shadow-2"></span>
          <span className="border-shadow shadow-3"></span>
          <span className="border-shadow shadow-4"></span>
        </div>
      </div> */
    );
  }
}

export default withDI(Slider);
