import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { DIContainer, withDI } from "../../hooks/withDI";


export type RowData = DIContainer & PresaleData & {
  type: "LIVE" | "COMING" | "PAST";
}

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
  totalCollected: string;
};

interface State {
  logo: string | undefined;
  title: string | null;
  ticker: string | null;
  buyToken: string | null;
  telegram: string | null;
  twitter: string | null;
  discord: string | null;
  medium: string | null;
  collected: string | null;
  percentage: number | null;
  website: string | null;
  whitelist: "PUBLIC" | "PRIVATE" | null;
}

class Row extends React.Component<RowData, State> {
  constructor(props: RowData) {
    super(props);
    this.state = {
      logo: undefined,
      title: null,
      ticker: null,
      buyToken: "ETH",
      collected: null,
      percentage: null,
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
      collected: this.props.totalCollected,
      percentage: wallet.getPercentageCollected(this.props.totalCollected, this.props.hardcap),
    });
  }

  render(): React.ReactNode {
    return (
      <Link to={"/details/" + this.props.id}>
        <div className="previous-item hover-shape-border hover-shape-inner desktop-version">
          <div className="previous-gaming">
            <div className="previous-image">
              <img className="logo-project"
                src={this.state.logo
                  ? this.state.logo
                  : "/assets/images/project/privius-image.png"}
                alt="Previous" />
            </div>
            <div className="previous-price">
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
          <div className="previous-chaining desktop">
            <img className="logo-chain"
              src="/assets/images/project/project-single-image.png"
              alt="Chain" />
          </div>
          </div>
          <div className="TotalRaisedProgressHeadings">
            <div className="rised-data">
              <span>{this.state.percentage != null ? this.state.percentage.toFixed(2) : "..."} %</span>
                  <span>
                    {this.state.collected != null ? this.state.collected : "..."}&nbsp;
                    {this.state.buyToken ? this.state.buyToken : "..."} <span className="off">of</span>
                    {this.state.buyToken
                        ? this.props.hardcap + " " + this.state.buyToken
                        : "..."}
                  </span>
            </div>
            <div className="progress-inner">
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    aria-valuenow={this.state.percentage != null ? this.state.percentage : 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{
                      width: this.state.percentage != null
                        ? this.state.percentage.toFixed(2) + "%"
                        : 0 + "%",
                    }}
                  ></div>
                </div>
            </div>
          </div>
          <div className="previous-raise">
           <div className="finish-div">
             {this.props.type === "PAST" && <span className="finished">Finished&nbsp;
             {this.props.startDate && this.props.type !== "PAST" && (
                 <Moment fromNow>{Number(this.props.startDate) * 1000}</Moment>
               )}
               {this.props.endDate && this.props.type === "PAST" && (
                 <Moment fromNow>{Number(this.props.endDate) * 1000}</Moment>
               )}
               {!this.props.startDate ||
                 !this.props.endDate ||
                 (!this.props.type && "...")}
             </span>}
             {this.props.type === "COMING" &&  <span className="coming">Will start&nbsp;
             {this.props.startDate ? (
                    <Moment fromNow>{Number(this.props.startDate) * 1000}</Moment>
                    ) : (
                      "..."
                    )}
               {!this.props.startDate ||
                 !this.props.endDate ||
                 (!this.props.type && "...")}
             </span>}
             {this.props.type === "LIVE" && <span className="live">Will finish&nbsp;
             {this.props.startDate && this.props.type !== "LIVE" && (
                 <Moment fromNow>{Number(this.props.startDate) * 1000}</Moment>
               )}
               {this.props.endDate && this.props.type === "LIVE" && (
                 <Moment fromNow>{Number(this.props.endDate) * 1000}</Moment>
               )}
               {!this.props.startDate ||
                 !this.props.endDate ||
                 (!this.props.type && "...")}
             </span>}
           </div>
          </div>
        </div>
        <div className="previous-item hover-shape-border hover-shape-inner mobile-version">
          <div className="previous-gaming mobile">
            <div className="previous-image">
              <img className="logo-project"
                src={this.state.logo
                  ? this.state.logo
                  : "/assets/images/project/privius-image.png"}
                alt="Previous" />
            </div>
            <div className="previous-price">
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
          </div>
          <div className="previous-raise-mobile">
          <div className="previous-chaining-mobile">
              <img className="logo-chain"
                src="/assets/images/project/project-single-image.png"
                alt="Chain" />
            </div>
           <div className="finish-div">
             {this.props.type === "PAST" && <span className="finished">Finished&nbsp;
             {this.props.startDate && this.props.type !== "PAST" && (
                 <Moment fromNow>{Number(this.props.startDate) * 1000}</Moment>
               )}
               {this.props.endDate && this.props.type === "PAST" && (
                 <Moment fromNow>{Number(this.props.endDate) * 1000}</Moment>
               )}
               {!this.props.startDate ||
                 !this.props.endDate ||
                 (!this.props.type && "...")}
             </span>}
             {this.props.type === "COMING" && <span className="coming">Will start&nbsp;
             {this.props.startDate && this.props.type !== "COMING" && (
                 <Moment fromNow>{Number(this.props.startDate) * 1000}</Moment>
               )}
               {this.props.endDate && this.props.type === "COMING" && (
                 <Moment fromNow>{Number(this.props.endDate) * 1000}</Moment>
               )}
               {!this.props.startDate ||
                 !this.props.endDate ||
                 (!this.props.type && "...")}
             </span>}
             {this.props.type === "LIVE" && <span className="live">Will finish&nbsp;
             {this.props.startDate && this.props.type !== "LIVE" && (
                 <Moment fromNow>{Number(this.props.startDate) * 1000}</Moment>
               )}
               {this.props.endDate && this.props.type === "LIVE" && (
                 <Moment fromNow>{Number(this.props.endDate) * 1000}</Moment>
               )}
               {!this.props.startDate ||
                 !this.props.endDate ||
                 (!this.props.type && "...")}
             </span>}
           </div>
          </div>
          <div className="TotalRaisedProgressHeadings">
            <div className="rised-data">
              <span>{this.state.percentage != null ? this.state.percentage.toFixed(2) : "..."} %</span>
                  <span>
                    {this.state.collected != null ? this.state.collected : "..."}&nbsp;
                    {this.state.buyToken ? this.state.buyToken : "..."} <span className="off">of</span>
                    {this.state.buyToken
                        ? this.props.hardcap + " " + this.state.buyToken
                        : "..."}
                  </span>
            </div>
            <div className="progress-inner">
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    aria-valuenow={this.state.percentage != null ? this.state.percentage : 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{
                      width: this.state.percentage != null
                        ? this.state.percentage.toFixed(2) + "%"
                        : 0 + "%",
                    }}
                  ></div>
                </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default withDI(Row);
