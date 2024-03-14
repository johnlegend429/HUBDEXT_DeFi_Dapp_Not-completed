import React from "react";
import Moment from "react-moment";
import { PresaleData } from "../components/partials/Box";
import { DIContainer, withDI } from "../hooks/withDI";
import getDataFromSaleQuery from "../queries/getDataFromSale";
import { SubgraphService } from "../services/subgraph";
import { error, success } from "@pnotify/core";
import AccessTooltip from "../components/modules/tooltips/access";
import AllocationTooltip from "../components/modules/tooltips/allocation";
import SoftcapTooltip from "../components/modules/tooltips/softcap";
import StickyBox from "react-sticky-box";
import { MathService } from "../services/math";
import ReactMarkdown from "react-markdown";
import ComingInSlider from "../components/presales/PromotedInSlider"


export type IDODetails = DIContainer & PresaleData & {
  type: "LIVE" | "COMING" | "PAST";
};

interface State {
  logo: string | undefined;
  banner: string | undefined;
  title: string | null;
  description: string | null;
  video: string | undefined;
  ticker: string | null;
  buyToken: string | null;
  telegram: string | null;
  twitter: string | null;
  discord: string | null;
  medium: string | null;
  website: string | null;
  whitelist: "PUBLIC" | "PRIVATE" | null;
  walletWhitelisted: boolean | null;
  whitelistLink: string | null;
  presale: PresaleData | null;
  buyStep: number | null;
  collected: string | null;
  totalSupply: string | null;
  decimals: number | null;
  tokenName: string | null;
  startDistribution: number | null;
  finished: boolean | null;
  started: boolean | null;
  type: "LIVE" | "COMING" | "PAST" | null;
  percentage: string | null;
  hasVesting: boolean | null;
  vestingPercents: number[] | null;
  claimTiming: number | null;
  claimableTokens: string | null;
  claimedTokens: string | null;
  alreadyRefunded: number | null;
  pendingClaimable: string | null;
  amountToBuy: string | null;
  amountToReceive: string | null;
}

class Details extends React.Component<IDODetails, State> {
  saleAddress: string | undefined = undefined;
  math: MathService;

  constructor(props: IDODetails) {
    super(props);
    this.math = this.props.mathImpl;

    this.state = {
      logo: undefined,
      banner: undefined,
      title: null,
      description: null,
      video: undefined,
      ticker: null,
      buyToken: "ETH",
      telegram: null,
      twitter: null,
      discord: null,
      medium: null,
      website: null,
      whitelist: null,
      walletWhitelisted: null,
      presale: null,
      buyStep: null,
      collected: null,
      totalSupply: null,
      decimals: null,
      tokenName: null,
      startDistribution: null,
      finished: null,
      started: null,
      type: null,
      percentage: null,
      hasVesting: null,
      vestingPercents: null,
      claimTiming: null,
      claimableTokens: null,
      whitelistLink: null,
      claimedTokens: null,
      alreadyRefunded: null,
      pendingClaimable: null,
      amountToBuy: "",
      amountToReceive: "",
    };

    this.saleAddress = this.props.routerParams.address?.toLowerCase();
    this.onBlurUpdateAmounts = this.onBlurUpdateAmounts.bind(this);
    this.onChangeUpdateAmounts = this.onChangeUpdateAmounts.bind(this);
  }

  async getData(): Promise<void> {
    const subgraph: SubgraphService = this.props.subgraphImpl;

    const presale = (
      await subgraph.runQuery(getDataFromSaleQuery, {
        limit: 1,
        offset: 0,
        orderBy: "startDate",
        orderDirection: "asc",
        saleAddress: this.saleAddress,
      }) as { sales: IDODetails[] }
    ).sales[0];

    if (!presale) {
      this.saleAddress = undefined;
      this.setState({ pendingClaimable: "0" });
      return;
    }

    const ipfs = this.props.ipfsImpl;
    const wallet = this.props.walletImpl;

    wallet.on('accountsChanged', (accounts) => {
      console.log(accounts);
    });

    ipfs.getJsonFile<State>(presale.projectInfo).then((data) => {
      data.whitelistLink = data.whitelist;
      data.whitelist = this.state.whitelist;
      this.setState(data);
    });

    wallet
      .getPendingClaimable(this.saleAddress!, presale.token.decimals)
      .then(async (pending) => {
        this.setState({ pendingClaimable: this.math.toBigNumber(pending).toFixed() });
      })
      .catch(() => {
        this.setState({ pendingClaimable: "0" });
      });

    wallet.getVestingClaim(this.saleAddress!).then(async (vestings) => {
      this.setState({
        hasVesting: vestings.length > 1,
        vestingPercents: vestings,
        buyStep: Number(presale.minAllocation),
        claimTiming: await wallet.getClaimTiming(this.saleAddress!),
        claimableTokens: await wallet.getClaimableTokens(this.saleAddress!, presale.token.decimals),
        claimedTokens: await wallet.getClaimedTokens(this.saleAddress!, presale.token.decimals),
        alreadyRefunded: await wallet.alreadyRefunded(this.saleAddress!),
      });
    });

    this.setState({
      ticker: presale.token.symbol,
      whitelist: await wallet.isWhitelisted(presale.id),
      walletWhitelisted: await wallet.walletWhitelisted(presale.id, (await wallet.getConnectedWallet())!),
      totalSupply: this.math.toInternationalCurrency(presale.token.totalSupply),
      decimals: presale.token.decimals,
      tokenName: presale.token.name,
      startDistribution:
        (await wallet.getClaimCliffTime(presale.id)) + Number(presale.endDate),
      presale: presale,
      finished: (Number(presale.endDate) * 1000) < new Date().getTime(),
      started: (Number(presale.startDate) * 1000) > new Date().getTime(),
      collected: presale.totalCollected,
      percentage: wallet.getPercentageCollected(presale.totalCollected, presale.hardcap).toFixed(2),
    });
  }

  onChangeUpdateAmounts(evt: any): void {
    if (!evt.target.value || isNaN(evt.target.value) || Number(evt.target.value) === 0) {
      this.setState({
        amountToBuy: evt.target.value ?? '',
        amountToReceive: '0',
      });
    } else {

      let amountToBuy = this.math.toBigNumber(evt.target.value);

      if (amountToBuy.greaterThan(this.state.presale!.maxAllocation)) {
        amountToBuy = this.math.toBigNumber(this.state.presale!.maxAllocation);
      }

      this.setState({
        amountToBuy: amountToBuy.toFixed(),
      });

      if (evt.target.value && this.state.presale && this.state.presale.buyPrice) {
        const amount = amountToBuy.dividedBy(this.state.presale.buyPrice);

        this.setState({
          amountToReceive: amount.toFixed(),
        });
      }
    }
  }

  onBlurUpdateAmounts(evt: any): void {
    if (evt.target.value === '' || evt.target.value == null) {
      this.setState({
        amountToBuy: '',
        amountToReceive: '',
      });
    } else {

      let amountToBuy = this.math.toBigNumber(evt.target.value || 0);

      if (amountToBuy.lessThan(this.state.presale!.minAllocation)) {
        amountToBuy = this.math.toBigNumber(this.state.presale!.minAllocation);
      } else if (amountToBuy.greaterThan(this.state.presale!.maxAllocation)) {
        amountToBuy = this.math.toBigNumber(this.state.presale!.maxAllocation);
      }

      this.setState({ amountToBuy: amountToBuy.toFixed() });

      if (evt.target.value && this.state.presale && this.state.presale.buyPrice) {
        const amount = amountToBuy.dividedBy(this.state.presale.buyPrice);

        this.setState({
          amountToReceive: amount.toFixed(),
        });
      }
    }
  }

  failedPresale(): boolean {
    return !!(this.state.collected &&
      this.state.presale &&
      this.state.finished === true &&
      this.math.toBigNumber(this.state.collected).lt(this.state.presale.softcap));
  }

  buyTokens(): void {
    const wallet = this.props.walletImpl;

    (window as any).startLoading();

    wallet
      .buyTokens(this.saleAddress!, this.state.amountToBuy!)
      .then(() => {
        success({ text: "Success!" });
        void this.getData();
      })
      .catch((e) => {
        console.error(e);
        error({ text: "Error" });
      })
      .finally(() => {
        (window as any).stopLoading();
      });
  }

  refund(): void {
    const wallet = this.props.walletImpl;

    (window as any).startLoading();

    wallet
      .refund(this.saleAddress!)
      .then(() => {
        success({ text: "Success!" });
        void this.getData();
      })
      .catch((e) => {
        console.error(e);
        error({ text: "Error" });
      })
      .finally(() => {
        (window as any).stopLoading();
      });
  }

  componentWillMount() {
    void this.getData();
  }

  async claim() {
    if (!this.state.pendingClaimable) {
      error({ text: "There is nothing to claim at this moment." });
      return;
    }

    (window as any).startLoading();

    this.props.walletImpl
      .claim(this.saleAddress!)
      .then(() => {
        success({ text: "Success!" });
        this.getData();
      })
      .catch((e) => {
        console.error(e);
        error({ text: "Error" });
      })
      .finally(() => {
        (window as any).stopLoading();
      });
  }

  componentDidMount() {
    (window as any).triggerSlider();
  }

  render() {
    if (!this.saleAddress) {
      return (
        <div id="details-page">
          <div className="project_details_section">
            <div className="project_details_bg">
              <img
                src="/assets/images/bg/banner-bg.jpg"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="container">
              <div className="row flex-row-reverse">
                <div className="col-md-12 text-center">
                  <h2>Not found</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    let totalClaimed = "0";
    if (this.state.claimedTokens) {
      totalClaimed = this.state.claimedTokens;
    }

    return (
      <div id="details-page">
        <div className="project_details_section">
          <div className="project_details_bg">
            <img
              src="/assets/images/bg/banner-bg.jpg"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="details_project_right_section">
                  <div className="project_details_right_headings">
                    <div className="project_details_img zone">
                      <img
                        src={
                          this.state.logo
                            ? this.state.logo
                            : "/assets/images/project/ninga-5.png"
                        }
                        alt="img"
                        className="img-fluid logo-details"
                      />

                      <div className="details_project_name">
                        <h2>
                          {this.state.title ? this.state.title : "..."}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="subtitle">
                    <h2>THE PROJECT</h2>
                    <ReactMarkdown children={this.state.description}/>
                  </div>
                  <div className="video-details">
                    {
                      this.state.video
                        ? <iframe width="766" height="431" src={this.state.video}
                                  title="📢 The Cryptoverse - A Metaverse of Everything | Trailer"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen>
                        </iframe>
                        : ""
                    }
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <StickyBox offsetTop={150} offsetBottom={20} className="content-sidebr">
                  <div className="project_details_left_section">
                    <div className="project_details_left_timer_section">
                      <div className="project_details_left_timer">
                        <div className="price-counter">
                          <div className="timer timer_2 m-0">
                            <ul>
                              <li>
                                {this.state.finished === true && "Finished"}&nbsp;
                                {this.state.finished === false && "Finishes"}&nbsp;
                                {this.state.presale ? (
                                  <Moment className="hola-d" fromNow>
                                    {Number(this.state.presale.endDate) * 1000}
                                  </Moment>
                                ) : (
                                  "..."
                                )}
                              </li>
                            </ul>
                          </div>
                          {/*            <div className="finish-div">
                            <span className="capitalize">
                            {this.props.type == "PAST" &&  <span className="finish">Finished</span>}
                            {this.props.type == "COMING" &&  <span className="finish">Starts in</span>}
                            {this.props.type == "LIVE" &&  <span className="finish">Will finish in</span>}
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
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="details_project_name mt-40">
                      <h2>
                        {this.state.title ? this.state.title : "..."}
                      </h2>
                      <span className="desc">
                        Price of ({this.state.ticker ? this.state.ticker : "..."})
                        =&nbsp;</span>
                      <span className="tokenPrice">
                        {this.state.presale
                          ? this.state.presale.buyPrice
                          : "..."}&nbsp;
                        {this.state.buyToken ? this.state.buyToken : "..."}
                      </span>
                      <img
                        src="/assets/images/project/icon-2.png"
                        alt="icon"
                        className="img-fluid details"
                      />
                    </div>
                    <div className="Access_Allocation_ParticipantsSect">
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
                          <span className="withInfo">Allocation <AllocationTooltip/></span>
                          <p>
                            {this.state.presale
                              ? this.state.presale.maxAllocation
                              : "..."}&nbsp;
                            {this.state.buyToken ? this.state.buyToken : "..."}&nbsp;
                            Max
                          </p>
                        </li>
                        <li>
                          <span className="withInfo">Soft Cap <SoftcapTooltip/></span>
                          <p>
                            {this.state.presale?.softcap
                              ? this.state.presale.softcap
                              : "..."}&nbsp;
                            {this.state.buyToken ? this.state.buyToken : "..."}
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="TotalRaisedProgressSect mt-120">
                      <div className="TotalRised details">
                        <h3>
                          Total Raised &nbsp;
                        </h3>
                        <div className="raised-details">
                          <div>
                            {this.state.percentage != null ? (
                              // Note: counter class is linked to a jquery component
                              // Creating it before stated is rendered can cause displaying 0 instead
                              <span className="counter">
                                {this.state.percentage}
                            </span>
                            ) : <span></span>}
                            <span>%</span>
                          </div>
                          <div>
                                <span>
                                    {this.state.collected != null
                                      ? this.state.collected +
                                      " " +
                                      this.state.buyToken
                                      : "..."}&nbsp;
                                  /&nbsp;
                                  {this.state.presale
                                    ? this.state.presale.hardcap +
                                    " " +
                                    this.state.buyToken
                                    : "..."}
                                  </span>
                          </div>
                        </div>
                      </div>
                      <div className="TotalRaisedProgressBg">
                        <div
                          className="TotalRaisedProgressBar"
                          style={{
                            background: "#A3FF12",
                            height: 100 + "%",
                            width:
                              this.state.percentage + "%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="project_details_btn">
                    {this.state.whitelist === "PRIVATE" && this.state.finished === false && this.state.walletWhitelisted === true && (
                       ( <button
                          className="participateBtn black-shape"
                          data-bs-toggle="modal"
                          data-bs-target="#buyModal"
                        >
                          participates
                          <i className="icon-arrow_right"></i>
                        </button>)
                      )}
                      {this.state.whitelist === "PUBLIC" && (
                       ( <button
                          className="participateBtn black-shape"
                          data-bs-toggle="modal"
                          data-bs-target="#buyModal"
                        >
                          participates
                          <i className="icon-arrow_right"></i>
                        </button>)
                      )}
                {/*       {this.state.finished === false && (
                        <div className="will-start-in">
                          {this.state.started === false && "Will start"}&nbsp;
                          {this.state.started === true && "Started"}&nbsp;
                          {this.state.presale ?
                            (
                              <Moment className="hola-d" fromNow>
                                {Number(this.state.presale.startDate) * 1000}
                              </Moment>
                            ) : (
                              " "
                            )
                          }
                        </div>
                      )} */}
                      {this.failedPresale() && this.state.alreadyRefunded !== 0 && (
                        <button
                          className="participateBtn black-shape"
                          onClick={() => this.refund()}
                        >
                          Refund Allocation&nbsp;
                          <i className="icon-arrow_right"></i>
                        </button>
                      )}
                      {this.state.whitelist === "PRIVATE" && this.state.walletWhitelisted === false && (

                        <a
                          className="button WHITELISbtn black-shape"
                          target="_blank"
                          rel="noreferrer"
                          href={
                            this.state.whitelistLink
                              ? this.state.whitelistLink!
                              : "#"
                          }
                        >
                          JOIN WHITELIST&nbsp;
                          <i className="icon-arrow_right"></i>
                        </a>
                      )}
                    </div>
                    {this.state.hasVesting === true && this.state.pendingClaimable && this.state.pendingClaimable !== "0" && !this.failedPresale() && (
                      <div onClick={(e) => {
                        e.preventDefault();
                        window.location.replace('#claim-zone');
                      }}>
                        <span className="claim">CLAIM ZONE</span>
                      </div>
                    )
                    }
                  </div>
                  <div className="Project_clasic_2ContainerSocialSect">
                    <ul>
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
                  </div>
                </StickyBox>
              </div>
            </div>
            <div className="PoolAndTokenInfo_Sect">
              <div className="row">
                <div className="col-md-6">
                  <div className="PoolAndTokenInfo_card">
                    <h2>
                      Token INFO&nbsp;
                      <span>
                        <img
                          src="/assets/images/icons/steps.png"
                          alt=""
                          className="img-fluid"
                        />
                      </span>
                    </h2>
                    <div className="PoolAndTokenInfo_List">
                      <ul>
                        <li>
                          <p className="PoolAndTokenInfo_List_left">
                            Token Distribution
                          </p>
                          <p className="PoolAndTokenInfo_ListRight capitalize">
                            {this.state.startDistribution && (
                              <Moment fromNow>
                                {this.state.startDistribution * 1000}
                              </Moment>
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="PoolAndTokenInfo_List_left">
                            Min. Allocation
                          </p>
                          <p className="PoolAndTokenInfo_ListRight">
                            {this.state.presale
                              ? this.state.presale.minAllocation
                              : "..."}&nbsp;
                            {this.state.buyToken ? this.state.buyToken : "..."}
                          </p>
                        </li>
                        <li>
                          <p className="PoolAndTokenInfo_List_left">
                            Max. Allocation
                          </p>
                          <p className="PoolAndTokenInfo_ListRight">
                            {this.state.presale
                              ? this.state.presale.maxAllocation
                              : "..."}&nbsp;
                            {this.state.buyToken ? this.state.buyToken : "..."}
                          </p>
                        </li>
                        <li>
                          <p className="PoolAndTokenInfo_List_left">
                            Token Price
                          </p>
                          <p className="PoolAndTokenInfo_ListRight">
                            1&nbsp;
                            {this.state.buyToken ? this.state.buyToken : "..."}&nbsp;
                            =&nbsp;
                            {this.state.presale
                              ? this.math.toBigNumber(1).dividedBy(this.state.presale?.buyPrice!).toFixed()
                              : null}&nbsp;
                            {this.state.ticker ? this.state.ticker : "..."}
                          </p>
                        </li>
                        <li>
                          <p className="PoolAndTokenInfo_List_left">
                            Has Vesting?
                          </p>
                          <p className="PoolAndTokenInfo_ListRight">
                            {this.state.hasVesting != null &&
                              this.state.hasVesting &&
                              "Yes"}
                            {this.state.hasVesting != null && !this.state.hasVesting &&
                              "No"}
                            {this.state.hasVesting == null && "..."}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="PoolAndTokenInfo_card">
                    <h2>
                      Pool INFO&nbsp;
                      <span>
                        <img
                          src="/assets/images/icons/steps.png"
                          alt=""
                          className="img-fluid"
                        />
                      </span>
                    </h2>
                    <div className="PoolAndTokenInfo_List">
                      <ul>
                        <li>
                          <p className="PoolAndTokenInfo_List_left">
                            Token Name
                          </p>
                          <p className="PoolAndTokenInfo_ListRight">
                            {this.state.tokenName
                              ? this.state.tokenName
                              : "..."}
                          </p>
                        </li>
                        <li>
                          <p className="PoolAndTokenInfo_List_left">
                            Token Symbol
                          </p>
                          <p className="PoolAndTokenInfo_ListRight">
                            {this.state.ticker ? this.state.ticker : "..."}
                          </p>
                        </li>
                        <li>
                          <p className="PoolAndTokenInfo_List_left">Decimals</p>
                          <p className="PoolAndTokenInfo_ListRight">
                            {this.state.decimals ? this.state.decimals : "..."}
                          </p>
                        </li>
                        <li>
                          <p className="PoolAndTokenInfo_List_left">Address</p>
                          <p className="PoolAndTokenInfo_ListRight">
                            <button type="button" className="btn btn-default btn-copy js-tooltip js-copy"
                                    data-toggle="tooltip" data-placement="bottom" data-copy={this.saleAddress}>
                            <span>
                              <img
                                src="/assets/images/icons/copy_icon.svg"
                                alt=""
                                className="img-fluid"
                              />
                            </span>
                              {this.saleAddress.substring(0, 6)}...{this.saleAddress.substring(5, 10)}
                            </button>
                          </p>
                        </li>
                        <li>
                          <p className="PoolAndTokenInfo_List_left">
                            Supply
                          </p>
                          <p className="PoolAndTokenInfo_ListRight">
                            {this.state.totalSupply
                              ? this.state.totalSupply
                              : "..."}&nbsp;
                            {this.state.ticker ? this.state.ticker : "..."}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.state.hasVesting === true && (
              <div className="project_details_allocations_table_section">
                <h2>
                  Vesting Details&nbsp;
                  <span>
                    <img
                      src="/assets/images/icons/steps.png"
                      alt=""
                      className="img-fluid"
                    />
                  </span>
                </h2>
                <div className="ProjectDetails2_AllocationsTable">
                  <div className="ProjectDetails2_AllocationsTableHeadings">
                    <ul>
                      <li className="column_1">No.</li>
                      <li className="column_2">Percentage</li>
                      <li className="column_3">Amount</li>
                      <li className="column_4">Date</li>
                    </ul>
                  </div>

                  <div className="ProjectDetails2_AllocationsTableBody">
                    {this.state.vestingPercents?.map(
                      (item: number, index: number) => (
                        <ul key={index}>
                          <li className="column_1">{index + 1}</li>
                          <li className="column_2">
                            {(item / 100).toFixed(2)}%
                          </li>
                          <li className="column_3">
                            {this.state.presale?.maxAllocation
                              ? this.math.toBigNumber(1).dividedBy(this.state.presale?.buyPrice!)
                                .times(this.state.presale?.maxAllocation!).times(item).dividedBy(10000).toFixed(2)
                              : "..."}
                            {this.state.ticker
                              ? " " + this.state.ticker
                              : "..."}
                          </li>
                          <li className="column_4">
                            {this.state.startDistribution &&
                            this.state.claimTiming
                              ? new Date(
                                (this.state.startDistribution +
                                  index * this.state.claimTiming) *
                                1000
                              ).toLocaleString()
                              : "..."}
                          </li>
                        </ul>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            <div id="claim-zone">
              {this.state.hasVesting === true && this.state.pendingClaimable !== "0" && !this.failedPresale() && (
                <div className="sec-heading text-center pt-80">
                  <div className="sub-inner">
                    <span className="sub-title">THE</span>
                  </div>
                  <h2 className="mb-0 title">Claim zone</h2>
                </div>
              )}
              {this.state.claimableTokens != null &&
                this.state.claimableTokens !== "0" &&
                !this.failedPresale() && (
                  <div>
                    {this.state.pendingClaimable !== "0" &&
                      !this.failedPresale() && (
                        <div className="project_details_allocations_table_section pt-50">
                          <h2>
                            Pending Tokens&nbsp;
                            <span>
                            <img
                              src="/assets/images/icons/steps.png"
                              alt=""
                              className="img-fluid"
                            />
                          </span>
                          </h2>
                          <div className="ProjectDetails2_AllocationsTable">
                            <div className="ProjectDetails2_AllocationsTableHeadings">
                              <ul>
                                <li className="column_1">No.</li>
                                <li className="column_2">ACTION</li>
                              </ul>
                            </div>

                            <div className="ProjectDetails2_AllocationsTableBody">
                              <ul>
                                <li className="column_1">
                                  {this.state.pendingClaimable != null &&
                                  this.state.decimals
                                    ? this.props.mathImpl.toHumanValue(
                                      this.state.pendingClaimable + "",
                                      this.state.decimals
                                    )
                                    : "..."}&nbsp;
                                  {this.state.ticker
                                    ? " " + this.state.ticker
                                    : "..."}
                                </li>
                                <li className="column_2">
                                  <button className="claimBtn" onClick={() => this.claim()}>Claim
                                    <i className="icon-arrow_right"></i>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                    <div className="project_details_allocations_table_section pt-50">
                      <h2>
                        Your Allocations&nbsp;
                        <span>
                        <img
                          src="/assets/images/icons/steps.png"
                          alt=""
                          className="img-fluid"
                        />
                      </span>
                      </h2>
                      <div className="ProjectDetails2_AllocationsTable">
                        <div className="ProjectDetails2_AllocationsTableHeadings">
                          <ul>
                            <li className="column_1">No.</li>
                            <li className="column_2">Allocation</li>
                            <li className="column_3">Date</li>
                            <li className="column_4">Claimed</li>
                          </ul>
                        </div>

                        <div className="ProjectDetails2_AllocationsTableBody">
                          {this.state.vestingPercents?.map(
                            (item: number, index: number) => {
                              let claimed = false;
                              if (
                                totalClaimed !== "0" &&
                                this.state.claimableTokens
                              ) {
                                claimed = true;
                                totalClaimed = this.math.toBigNumber(totalClaimed).minus(this.state.claimableTokens).times(item).dividedBy(10000).toFixed();
                              }
                              return (
                                <ul key={index}>
                                  <li className="column_1">{index + 1}</li>
                                  <li className="column_2">
                                    {this.state.claimableTokens ?
                                      this.math.toBigNumber(this.state.claimableTokens).times(item).dividedBy(10000).toFixed()
                                      : "..."}
                                    {this.state.ticker
                                      ? " " + this.state.ticker
                                      : "..."}
                                  </li>
                                  <li className="column_3">
                                    {this.state.startDistribution &&
                                    this.state.claimTiming
                                      ? new Date(
                                        (this.state.startDistribution +
                                          index * this.state.claimTiming) *
                                        1000
                                      ).toLocaleString()
                                      : "..."}
                                  </li>
                                  <li className="column_4">
                                    {claimed
                                      ?
                                      this.math.toBigNumber(this.state.claimableTokens).times(item).dividedBy(10000).toFixed()
                                      : "0"
                                    }&nbsp;
                                    {this.state.ticker
                                      ? " " + this.state.ticker
                                      : "..."}
                                  </li>
                                </ul>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="buyModal"
          tabIndex={-1}
          aria-labelledby="buyModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content buy-modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="icon-x"></i>
                </button>
              </div>
              <div className="modal-body modal-body-buy">
                <div className="row">
                  <div className="col-lg-12">
                    <h4>
                      Amount to buy in&nbsp;
                      {this.state.buyToken ? this.state.buyToken : "..."}
                    </h4>
                  </div>
                  <div className="col-lg-12">
                    <div className="NidNumberSect">
                      <form action="">
                        <input
                          onInput={this.onChangeUpdateAmounts}
                          onBlur={this.onBlurUpdateAmounts}
                          value={this.state.amountToBuy!}
                          max={this.state.presale?.maxAllocation}
                          min={this.state.presale?.minAllocation}
                          step={this.state.buyStep!}
                          type="number"
                          placeholder={
                            "Max: " +
                            this.state.presale?.maxAllocation +
                            " " +
                            this.state.buyToken
                          }
                        />
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <h4>
                      You will receive&nbsp;
                      {this.state.ticker ? this.state.ticker : "..."}
                    </h4>
                  </div>
                  <div className="col-lg-12">
                    <div className="NidNumberSect">
                      <form action="">
                        <input
                          disabled
                          type="number"
                          value={this.state.amountToReceive!}
                          placeholder="Fill the input above..."
                        />
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="project_details_btn">
                      <button
                        onClick={() => this.buyTokens()}
                        className="participateBtnFull black-shape"
                      >
                        Buy Tokens&nbsp;
                        <i className="icon-arrow_right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="pb-60">
            <div className="container">
              <div className="sec-inner align-items-center d-flex justify-content-center mb-50 mt-50">
                <div className="sec-heading text-center">
                  <div className="sub-inner">
                    <span className="sub-title">View</span>
                  </div>
                  <h2 className="mb-0 title">Other projects</h2>
                </div>
              </div>
              <div className="row">
                <div
                  className="wow fadeInUp"
                  data-wow-delay="1s"
                  data-wow-duration="1.5s"
                >
                  <div
                    className="sc-carousel owl-carousel"
                    data-loop="true"
                    data-items="1"
                    data-margin="30"
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
                    data-md-device="4"
                    data-md-device-nav="false"
                    data-md-device-dots="true"
                  >
                    <ComingInSlider/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withDI(Details);
