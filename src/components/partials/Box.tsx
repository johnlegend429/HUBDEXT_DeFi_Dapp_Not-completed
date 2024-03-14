import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { DIContainer, withDI } from "../../hooks/withDI";

export type BoxData = DIContainer & PresaleData;

export type PresaleData = {
  id: string;
  minAllocation: string;
  maxAllocation: string;
  token: { id: string, symbol: string, decimals: number, totalSupply: string, name: string };
  startDate: string;
  endDate: string;
  softcap: string;
  hardcap: string;
  buyPrice: string;
  projectInfo: string;
  totalCollected: string;
};

export type LocksData = {
  id: string;
  vesting: string;
  token: { id: string, symbol: string };
  beneficiary: string;
  start: number;
  cliff: number;
  duration: number;
  slicePeriodSeconds: number;
  revocable: Boolean;
  revokedTime: number;
  amount: number;
  end: number;
  claimed: string | null;
  claimable: string | null;
  vestedSeconds: number;
};
interface State {
  logo: string | undefined;
  title: string | null;
  banner: string | undefined;
  ticker: string | null;
  buyToken: string | null;
  telegram: string | null;
  twitter: string | null;
  discord: string | null;
  medium: string | null;
  website: string | null;
  whitelist: "PUBLIC" | "PRIVATE" | null;
}

class Box extends React.Component<BoxData, State> {
  constructor(props: BoxData) {
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
      <div className="col-lg-4 col-md-6">
        <Link to={"/details/" + this.props.id}>
          <div className="cover-img">
              <h4 className="timer">
                    {this.props.startDate ? (
                    <Moment fromNow>{Number(this.props.startDate) * 1000}</Moment>
                    ) : (
                      "..."
                    )}
              </h4>
            <img src={this.state.banner? this.state.banner: "/assets/images/bg/cover-box-projects.jpg"}
                alt="img" className="img-fluid cover-image"
            />
          </div>
          <div className="project-item hover-shape-border box">
            <div className="logo-zone">
              <img src={this.state.logo? this.state.logo: "/assets/images/bg/cover-box-projects.jpg"}
                  alt="img" className="img-fluid logo-image"
              />
            </div>
            <div className="box-title-price-chain">
              <div>
                  <h4 className="mb-1">
                    {this.state.title ? this.state.title : "..."}
                  </h4>
                  <div className="dsc">
                    Price of ({this.state.ticker ? this.state.ticker : "..."}) =&nbsp;
                    <span className="tokenPrice">
                      {this.props.buyPrice ? this.props.buyPrice : "..."}&nbsp;
                      {this.state.buyToken ? this.state.buyToken : "..."}
                    </span>  
                  </div>
                </div>  
                <div className="project-icon">
                  <img className="chain"
                    src="/assets/images/project/project-single-image.png"
                    alt="Project"
                  />
                </div>
            </div> 
            <div className="project-content">
              <div className="project-media">
                <ul className="project-listing">
                  <li>
                    Min investment&nbsp;
                    <span>
                      {this.state.buyToken
                        ? this.props.minAllocation + " " + this.state.buyToken
                        : "..."}
                    </span>
                  </li>
                  <li>
                    Max investment&nbsp;
                    <span>
                      {this.state.buyToken
                        ? this.props.maxAllocation + " " + this.state.buyToken
                        : "..."}
                    </span>
                  </li>
                  <li>
                    Fundraising&nbsp;
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
          </div>
        </Link>
      </div>
    );
  }
}

export default withDI(Box);
