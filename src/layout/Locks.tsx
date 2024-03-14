import { error, success } from "@pnotify/core";
import React from "react";
import Moment from "react-moment";
import { LocksData } from "../components/partials/Box";
import { DIContainer, withDI } from "../hooks/withDI";
import getVestingSchedulesQuery from "../queries/getVestingSchedules";
import { SubgraphService } from "../services/subgraph";
import { MathService } from "../services/math";

export type IDOLocks = DIContainer & {};

interface State {
  logo: string | undefined;
  title: string | null;
  description: string | null;
  ticker: string | null;
  locks: LocksData[] | null;
  tokenName: string | null;
  decimals: number | null;
  connectedAddress: string | null;
}

class Locks extends React.Component<IDOLocks, State> {
  tokenAddress: string | undefined = undefined;
  math: MathService;

  constructor(props: IDOLocks) {
    super(props);
    this.math = this.props.mathImpl;

    this.state = {
      logo: undefined,
      title: null,
      description: null,
      ticker: null,
      locks: null,
      tokenName: null,
      decimals: null,
      connectedAddress: null,
    };

    this.tokenAddress = this.props.routerParams.address;
  }

  async getData(): Promise<void> {
    const wallet = this.props.walletImpl;
    const subgraph: SubgraphService = this.props.subgraphImpl;

    subgraph
      .runQuery(getVestingSchedulesQuery, {
        token: this.tokenAddress,
      })
      .then(async (vestings) => {
        this.setState({
          decimals: await wallet.getTokenDecimals(this.tokenAddress!),
          connectedAddress: await wallet.getConnectedWallet(),
        });

        for (let i = 0; i < vestings["vestingSchedules"].length; i++) {
          const currentTime = parseInt(new Date().getTime() / 1000 + "");
          if (currentTime < vestings["vestingSchedules"][i].start) {
            vestings["vestingSchedules"][i].vestedSeconds = 0;
            vestings["vestingSchedules"][i].claimed = "0";
            continue;
          }

          wallet
            .getClaimedFromVesting(
              vestings["vestingSchedules"][i].vesting,
              vestings["vestingSchedules"][i].id
            )
            .then((claimed: number) => {
              vestings["vestingSchedules"][i].claimed = claimed;
              this.setState({ locks: vestings["vestingSchedules"] });
            });
          if (
            currentTime >=
            parseInt(vestings["vestingSchedules"][i].start) +
            parseInt(vestings["vestingSchedules"][i].duration)
          ) {
            vestings["vestingSchedules"][i].claimable =
              vestings["vestingSchedules"][i].amount;
            continue;
          }
          const timeFromStart =
            currentTime - vestings["vestingSchedules"][i].start;
          const secondsPerSlice =
            vestings["vestingSchedules"][i].slicePeriodSeconds;
          const vestedSlicePeriods = timeFromStart / secondsPerSlice;

          vestings["vestingSchedules"][i].vestedSeconds = Math.ceil(
            vestedSlicePeriods * secondsPerSlice
          );
          vestings["vestingSchedules"][i].claimable = (
            (vestings["vestingSchedules"][i].amount *
              vestings["vestingSchedules"][i].vestedSeconds) /
            parseInt(vestings["vestingSchedules"][i].duration)
          ).toLocaleString("fullwide", { useGrouping: false });
        }
        this.setState({ locks: vestings["vestingSchedules"] });
      })
      .catch(() => {
        this.setState({ locks: [] });
      });

    if (this.tokenAddress !== undefined) {
      this.setState({ ticker: await wallet.getTokenTicker(this.tokenAddress) });
    }
  }

  toHumanValue(blockchainValue: number) {
    return this.math.toHumanValue(
      blockchainValue.toLocaleString("fullwide", { useGrouping: false }),
      this.state.decimals!
    );
  }

  componentWillMount() {
    void this.getData();
  }

  async claim(vestingAddress: string, scheduleId: string) {
    (window as any).startLoading();

    this.props.walletImpl
      .claimFromVesting(vestingAddress, scheduleId)
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

  render() {
    if (!this.tokenAddress) {
      return (
        <div>
          <div className="project_details_section">
            <div className="project_details_bg">
              <img
                src="/assets/images/bg/projectDetails2BG.jpg"
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

    return (
      <div>
        <div className="project_details_section">
          <div className="project_details_bg">
            <img
              src="/assets/images/bg/projectDetails2BG.jpg"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="container">
            <div>
              <div className="project_details_allocations_table_section pt-50">
                <h2>
                  My Pending Vestings&nbsp;
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
                      <li className="column_2">Claimable</li>
                      <li className="column_3">Start Dist</li>
                      <li className="column_4">End Dist</li>
                      <li className="column_4">Total</li>
                      <li className="column_2">Actions</li>
                    </ul>
                  </div>

                  <div className="ProjectDetails2_AllocationsTableBody">
                    {this.state.connectedAddress &&
                      this.state.locks?.map(
                        (lock: LocksData, index: number) => {
                          if (
                            lock.beneficiary.toLowerCase() ===
                            this.state.connectedAddress!.toLowerCase()
                          ) {
                            return (
                              <ul key={index}>
                                <li className="column_2">
                                  {lock.claimable != null &&
                                    lock.claimed != null &&
                                    this.math.toBigNumber(lock.claimable).minus(lock.claimed).toFixed() +
                                    " " +
                                    this.state.ticker}
                                </li>
                                <li className="column_3">
                                  <Moment format="DD/MM/YYYY HH:MM:SS">
                                    {(Number(lock.start) + Number(lock.cliff)) *
                                      1000}
                                  </Moment>
                                </li>
                                <li className="column_4 capitalize">
                                  <Moment fromNow>
                                    {(Number(lock.start) +
                                        Number(lock.duration)) *
                                      1000}
                                  </Moment>
                                </li>
                                <li className="column_4">
                                  {lock.claimed != null &&
                                    this.toHumanValue(lock.amount) +
                                    " " +
                                    this.state.ticker}
                                </li>
                                <li className="column_2">
                                  <button
                                    onClick={() =>
                                      this.claim(lock.vesting, lock.id)
                                    }
                                  >
                                    Claim
                                  </button>
                                </li>
                              </ul>
                            );
                          } else {
                            return '';
                          }
                        }
                      )}
                  </div>
                </div>
              </div>

              <div className="project_details_allocations_table_section pt-50">
                <h2>
                  Vesting List&nbsp;
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
                      <li className="column_1">Address</li>
                      <li className="column_2">Total</li>
                      <li className="column_3">Start Distribution</li>
                      <li className="column_4">End Distribution</li>
                    </ul>
                  </div>

                  <div className="ProjectDetails2_AllocationsTableBody">
                    {this.state.locks?.map((lock: LocksData, index: number) => {
                      if (
                        !this.state.connectedAddress ||
                        lock.beneficiary.toLowerCase() !==
                        this.state.connectedAddress!.toLowerCase()
                      ) {
                        return (
                          <ul key={index}>
                            <li className="column_1">
                              {lock.beneficiary.substring(0, 5)}...
                              {lock.beneficiary.substring(37, 64)}
                            </li>
                            <li className="column_2">
                              {this.toHumanValue(lock.amount) +
                                " " +
                                this.state.ticker}
                            </li>
                            <li className="column_3">
                              <Moment format="DD/MM/YYYY HH:MM:SS">
                                {(Number(lock.start) + Number(lock.cliff)) *
                                  1000}
                              </Moment>
                            </li>
                            <li className="column_4 capitalize">
                              <Moment fromNow>
                                {(Number(lock.start) + Number(lock.duration)) *
                                  1000}
                              </Moment>
                            </li>
                          </ul>
                        );
                      } else {
                        return '';
                      }
                    })}
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

export default withDI(Locks);
