import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { DIContainer, withDI } from "../../hooks/withDI";

export type LiveData = DIContainer & {
  id: string;
  token: { id: string, symbol: string, totalSupply: string };
  buyPrice: string;
  startDate: string;
  endDate: string;
  hardcap: string;
  type: "LIVE" | "COMING" | "PAST";
  projectInfo: string;
  totalCollected: string;
};

interface State {
  logo: string | undefined;
  title: string | null;
  ticker: string | null;
  buyToken: string | null;
  collected: string | null;
  percentage: number | null;
}

class Live extends React.Component<LiveData, State> {
  constructor(props: LiveData) {
    super(props);
    this.state = {
      logo: undefined,
      title: null,
      ticker: null,
      buyToken: "ETH",
      collected: null,
      percentage: null,
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
      collected: this.props.totalCollected,
      percentage: wallet.getPercentageCollected(this.props.totalCollected, this.props.hardcap),
    });
  }

  render(): React.ReactNode {
    return (
      <Link to={"/details/" + this.props.id}>
        <div className="previous-item hover-shape-border hover-shape-inner">
          <div className="previous-gaming">
            <div className="previous-image">
              <img
                src={
                  this.state.logo
                    ? this.state.logo
                    : "/assets/images/project/privius-image.png"
                }
                alt="Previous"
              />
            </div>
            <div className="previous-price">
              <h4 className="mb-10">
                {this.state.title ? this.state.title : "..."}
              </h4>
              <div className="dsc">
                PRICE ({this.state.ticker ? this.state.ticker : "..."}) =&nbsp;
                {this.props.buyPrice ? this.props.buyPrice : "..."}&nbsp;
                {this.state.buyToken ? this.state.buyToken : "..."}
              </div>
            </div>
          </div>
          <div className="previous-chaining">
            <img
              src="/assets/images/project/project-single-image.png"
              alt="Chain"
            />
            <span className="capitalize">
              {this.props.startDate && this.props.type !== "LIVE" && (
                <Moment fromNow>{Number(this.props.startDate) * 1000}</Moment>
              )}
              {this.props.endDate && this.props.type === "LIVE" && (
                <Moment fromNow>{Number(this.props.endDate) * 1000}</Moment>
              )}
              {!this.props.startDate ||
                !this.props.endDate ||
                (!this.props.type && "...")}
            </span>
          </div>
          <div className="previous-raise">
            <span>
              {this.state.collected != null ? this.state.collected : "..."}&nbsp;
              {this.state.buyToken ? this.state.buyToken : "..."} (
              {this.state.percentage != null ? this.state.percentage.toFixed(2) : "..."}%)
            </span>
            <div className="progress-inner">
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped"
                  role="progressbar"
                  aria-valuenow={
                    this.state.percentage != null ? this.state.percentage : 0
                  }
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{
                    width:
                      this.state.percentage != null
                        ? this.state.percentage.toFixed(2) + "%"
                        : 0 + "%",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <span className="border-shadow shadow-1"></span>
          <span className="border-shadow shadow-2"></span>
          <span className="border-shadow shadow-3"></span>
          <span className="border-shadow shadow-4"></span>
          <span className="hover-shape-bg hover_shape1"></span>
          <span className="hover-shape-bg hover_shape2"></span>
          <span className="hover-shape-bg hover_shape3"></span>
        </div>
      </Link>
    );
  }
}

export default withDI(Live);
