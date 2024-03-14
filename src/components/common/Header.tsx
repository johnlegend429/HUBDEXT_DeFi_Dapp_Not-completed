import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import React, { useEffect, useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ComingSoonStaking from "../modules/tooltips/disabledStaking";
import ComingSoonPools from "../modules/tooltips/disabledPools";
import ComingSoonGovernance from "../modules/tooltips/disabledGovernance";
import ComingSoonCommunity from "../modules/tooltips/disabledCommunity";
import { NavLink } from "react-router-dom";

declare const $: any;

console.log(process.env, process.env.REACT_APP_SUPPORTED_CHAINS)

const SUPPORTED_CHAINS = process.env.REACT_APP_SUPPORTED_CHAINS?.split(',').map(chainId => Number(chainId)) || [];

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  let isSupportedNetwork: boolean;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const hideMenuNav = () => {
    setIsNavOpen(false)
  }

  const {
    account,
    activate,
    active,
    connector,
    deactivate,
    error
  } = useWeb3React();

  isSupportedNetwork = true;

  if (error instanceof UnsupportedChainIdError) {
    isSupportedNetwork = false;
    localStorage.setItem("isWalletConnected", "false");
  }

  const injected = new InjectedConnector({
    supportedChainIds: SUPPORTED_CHAINS,
  });

  async function connect() {
    try {
      if (!isSupportedNetwork && connector) {
        const web3Provider = await connector.getProvider();
        await web3Provider.request!({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${SUPPORTED_CHAINS[0].toString(16)}`,
            },
          ],
        });
      } else {
        void await activate(injected);
      }
      localStorage.setItem("isWalletConnected", "true");
      $("#walletModal").modal("hide");
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", "false");
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          void await activate(injected);
          localStorage.setItem("isWalletConnected", "true");
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad().then();
  }, []);


  const [navbar, setNavbar] = useState(false)

  const changeBackground = () => {

    if (window.scrollY >= 66) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  useEffect(() => {
    changeBackground()
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground)
  })

  return (
    <div>
      <header
        id="dextools-header"
        className={navbar ? "dextools-header-section active" : "dextools-header-section"}
      >
        <div className="menu-area menu-sticky">
          <div className="container-hero">
            <div className="heaader-inner-area d-flex justify-content-end align-items-center">
              <div className="dextools-logo-area  align-items-center">
                <div className="logo">
                  <NavLink to="/">
                    <img src="/assets/images/logo-png.png" alt="logo"/>
                  </NavLink>
                </div>
              </div>
              <div className="header-menu">
                <ul className="nav-menu">
                  <li>
                    <NavLink className={(navData) => (navData.isActive ? 'active' : '')} to="/">Home</NavLink>
                  </li>
                  <li className="menu-item-has-children">
                    <NavLink className={(navData) => (navData.isActive ? 'active' : '')} to="/idos">Launchpad</NavLink>
                    <ul className="sub-menu">
                      <li><NavLink className={(navData) => (navData.isActive ? 'active' : '')}
                                   to="/idos">Projects</NavLink></li>
                      <li><NavLink className={(navData) => (navData.isActive ? 'active' : '')} to="/send-project">Submit
                        your project</NavLink></li>
                    </ul>
                  </li>
                  <li>
                    <NavLink className={(navData) => (navData.isActive ? 'actives' : '')} to=/* "/staking" */"#"><span
                      className="disabled"><ComingSoonStaking/>{/* Staking */}</span></NavLink>
                  </li>
                  <li>
                    <NavLink className={(navData) => (navData.isActive ? 'actives' : '')} to=/* "/pools" */"#"><span
                      className="disabled"><ComingSoonPools/>{/* Pools */}</span></NavLink>
                  </li>
                  <li>
                    <NavLink className={(navData) => (navData.isActive ? 'actives' : '')}
                             to=/* "/governance" */"#"><span
                      className="disabled"><ComingSoonGovernance/>{/* Governance< */}</span></NavLink>
                    {/*   <ul className="sub-menu">
                            <li><a href="#">Vote</a></li>
                            <li><a href="#">Submit your proposal</a></li>
                        </ul> */}
                  </li>
                  <li>
                    <NavLink className={(navData) => (navData.isActive ? 'actives' : '')} to=/* "/community" */"#"><span
                      className="disabled"><ComingSoonCommunity/>{/* Community */}</span></NavLink>
                  </li>
                </ul>
              </div>
              <div className="dextools-btn-area" onClick={() => setIsNavOpen((prev) => !prev)}>
                <ul>
                  <li>
                    <div id="nav-expander" className="nav-expander bar">
                      <div className="bar">
                        <span className="dot1"></span>
                        <span className="dot2"></span>
                        <span className="dot3"></span>
                      </div>
                    </div>
                  </li>
                  <li>
                    {active ? (
                        <div className="disconnect-wallet">
                          <button
                            id="disconnect-wallet"
                            className="readon white-btn hover-shape"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                          >
                            <img className="wallet-button"
                                 src="/assets/images/icons/connect.png"
                                 alt="Icon"
                            />
                            <span className="btn-text">
                            {account?.substring(0, 6)}...{account?.substring(21, 26)}
                          </span>
                            <i className="icon-arrow_right"></i>
                          </button>
                          <Menu
                            id="disconnect-wallet"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            <MenuItem onClick={disconnect}>Disconnect</MenuItem>
                          </Menu>
                        </div>
                      ) :
                      isSupportedNetwork ? (
                        <button
                          type="button"
                          className="readon white-btn hover-shape"
                          data-bs-toggle="modal"
                          data-bs-target="#walletModal"
                        >
                          <span className="btn-text">Connect wallet</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="readon white-btn danger-btn hover-shape"
                          onClick={connect}
                        >
                          <span className="btn-text">Switch Network</span>
                        </button>)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav
          /* className="right_menu_togle mobile-navbar-menu" */
          className={isNavOpen ? "showMenuNav" : "hideMenuNav"}
          id="mobile-navbar-menu"
        >
          <div className="close-btn">
            <div id="nav-close2" className="nav-close" onClick={hideMenuNav}>
              <div className="line">
                <span className="line1"></span>
                <span className="line2"></span>
              </div>
            </div>
          </div>
          {/*      <div className="sidebar-logo mb-30">
            <a href="/">
              <img src="/assets/images/logo.svg" alt="" />
            </a>
          </div> */}
          <ul className="nav-menu">
            <li className="current-menu-item">
              <NavLink onClick={hideMenuNav} className={(navData) => (navData.isActive ? 'active' : '')}
                       to="/">Home</NavLink>
            </li>
            <li>
              <NavLink onClick={hideMenuNav} className={(navData) => (navData.isActive ? 'active' : '')}
                       to="/idos">Projects</NavLink>
            </li>
            <li>
              <NavLink onClick={hideMenuNav} className={(navData) => (navData.isActive ? 'active' : '')}
                       to="/send-project">Send Project</NavLink>
            </li>
            <li>
              {active ? (
                <button
                  type="button"
                  className="readon black-shape-big connectWalletBtnforMobile"
                  onClick={disconnect}
                >
                  <img
                    src="/assets/images/icons/connect_white.png"
                    alt="Icon"
                  />
                  <span className="btn-text">
                    {account?.substring(0, 5)}...{account?.substring(21, 26)}
                  </span>
                </button>
                ) :
                isSupportedNetwork ? (
                  <button
                    type="button"
                    className="readon black-shape-big connectWalletBtnforMobile"
                    data-bs-toggle="modal"
                    data-bs-target="#walletModal"
                  >
                    <span className="btn-text">Connect wallet</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="readon black-shape-big danger-btn connectWalletBtnforMobile"
                    onClick={connect}
                  >
                    <span className="btn-text">Switch Network</span>
                  </button>)}
            </li>
          </ul>
        </nav>
      </header>

      <div
        className="modal fade"
        id="walletModal"
        tabIndex={-1}
        aria-labelledby="walletModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="mb-20 modal-header">
              <h4 className="mb-0 modals-title" id="walletModalLabel">
                Connect Wallet
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-20 connect-section">
                <ul className="heading-list">
                  <li onClick={connect}>
                    <a>
                      <span>
                        <img
                          src="/assets/images/icons/meta-mask.png"
                          alt="Meta-mask"
                        />
                      </span>
                      MetaMask
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>
                        <img
                          src="/assets/images/icons/wallet.png"
                          alt="Wallet"
                        />
                      </span>
                      WalletConnect
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        nav.showMenuNav {
          right: 0 !important;
      }
      .hideMenuNav {
        right: -500px;
      }

    `}</style>
    </div>
  );
}
