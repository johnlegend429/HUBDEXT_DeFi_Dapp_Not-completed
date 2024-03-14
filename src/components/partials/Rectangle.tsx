import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { DIContainer, withDI } from "../../hooks/withDI";
import { PresaleData } from "./Box";
import AccessTooltip from "../../components/modules/tooltips/access";
import AllocationTooltip from "../../components/modules/tooltips/allocation";
import SoftcapTooltip from "../../components/modules/tooltips/softcap";

export type RectangleData = DIContainer & {
  id: string;
  minAllocation: string;
  maxAllocation: string;
  token: { id: string, symbol: string, totalSupply: string };
  buyPrice: string;
  hardcap: string;
  endDate: string;
  startDate: string;
  projectInfo: string;
  totalCollected: string;
};

interface State {
  logo: string | undefined;
  banner: string | undefined;
  title: string | null;
  ticker: string | null;
  buyToken: string | null;
  collected: string | null;
  percentage: string | null;
  whitelist: "PUBLIC" | "PRIVATE" | null;
  presale: PresaleData | null;
}

class Rectangle extends React.Component<RectangleData, State> {
  constructor(props: RectangleData) {
    super(props);
    this.state = {
      logo: undefined,
      banner: undefined,
      title: null,
      ticker: null,
      buyToken: "ETH",
      collected: null,
      percentage: null,
      whitelist: null,
      presale: null,
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
      percentage: wallet.getPercentageCollected(this.props.totalCollected, this.props.hardcap).toFixed(2),
    });
  }

  

  render(): React.ReactNode {

    let bannerProjectBack = this.state.banner? this.state.banner  : "/assets/images/bg/cover-box-projects.jpg";

    return (
      <Link to={"/details/" + this.props.id}>
        <div className="game-price-item active-shape hover-shape-inner">
        <div className="image-icon">
                  <img
                    className="logo-heroRelated"
                  /*   src={
                      this.state.buyToken
                        ? this.state.logo
                        : "/assets/images/project/logo-rarible.png"
                    } */
                    src="/assets/images/project/logo-rarible.png" // cambiar por el código de arriba para que funcione el logo de ipfs
                    alt="icon"
                  />
            </div>
          <div className="related" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url("${bannerProjectBack}")` }}>
     {/*      <div className="cover-img">
            <img src={this.state.banner? this.state.banner  : "/assets/images/bg/cover-box-projects.jpg"}
                alt="img" className="img-fluid cover-image"
            />
          </div> */}
            <div className="total-price">
              <div className="price-inner d-flex sm-mt-65 mt-95 md-mb-20">
                <div className="price-details">
                  <h3 className="mb-15">
                    {this.state.title ? this.state.title : "..."}
                  </h3>
                </div>
              </div>
            </div>
            <div className="chainPriceHeroRelated">
              <div className="primaryPriceChain">
                <div>
                  <img src="/assets/images/project/icon-2.png" alt="icon" />
                </div>
                <div>
                  <div className="prePrice">
                    Price of ({this.state.ticker ? this.state.ticker : "..."}) &nbsp;
                    </div>
                    <div className="price">
                      {this.props.buyPrice ? this.props.buyPrice : "..."}&nbsp;
                        {this.state.buyToken ? this.state.buyToken : "..."}
                  </div>
                </div>
              </div>
              <div className="subInfo">
                     <div className="Access_Allocation_Related">
                      <ul>
                        <li>
                          <span className="withInfo">Access <AccessTooltip/></span>
                          <p>
                            &nbsp;
                            {this.state.whitelist &&
                              this.state.whitelist === "PUBLIC" &&
                              "Public"}
                            {this.state.whitelist &&
                              this.state.whitelist === "PRIVATE" &&
                              "Private"}
                            {!this.state.whitelist && "..."}
                          </p>
                        </li>
                        <li>
                          <span className="withInfo">Max. Investment <AllocationTooltip/></span>
                          <p>
                            {this.props.maxAllocation ? this.props.maxAllocation : "..."}&nbsp;
                           {this.state.buyToken ? this.state.buyToken : "..."} 
                          </p>
                        </li>
                        <li>
                          <span className="withInfo">Fundraising<SoftcapTooltip/></span>
                          <p>
                            {this.props.hardcap ? this.props.hardcap : "..."}&nbsp;
                          {this.state.buyToken ? this.state.buyToken : "..."}
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="all-raise text-center"><span> Launch:  </span>    {this.props.startDate ? (
                            <Moment fromNow>{Number(this.props.startDate) * 1000}</Moment>
                            ) : (
                              "..."
                            )}           

                    </div>
                  </div>   
                </div>            
               </div>
            </div>
         
                 

{/*       <div className="progress-inner">
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
                      ? this.state.percentage + "%"
                      : 0 + "%",
                }}
              ></div>
            </div>
          </div> */}
      </Link>
    );
  }
}

export default withDI(Rectangle);
