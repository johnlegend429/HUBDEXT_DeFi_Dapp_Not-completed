import React from 'react'
import { NavLink } from "react-router-dom";
import BuyDext from '../BuyDext'
import DextPrice from '../DEXTPrice'
import "./styles.css"




export default FooterBottom

function FooterBottom() {
  return (
        <div className="container mt-5">
            <div>
                <div className="row mb-4">
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <div className="footer-text pull-left">
                            <div className="d-flex">
                                <img className='footer-logo' src="/assets/images/logo-png.png" alt="logo"/>
                            </div>
                            <p className="card-text">Defi ecosystem promoted by DEXT Force <br /> Launchpad, staking, games & more</p>
                            <div className="social mt-2 mb-3"> <a href="https://twitter.com/DextForce"><i className="fa fa-twitter fa-lg"></i></a><a href="https://t.me/DEXToolsCommunity"><i className="fa fa-telegram fa-lg" aria-hidden="true"></i></a><a href="https://discord.com/invite/PnycaVp"><i className='fa fa-discord fa-lg'></i></a></div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-2"></div>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                        <h5 className="heading">INFO</h5>
                        <ul>
                             <li><a href="https://dextforce.net">About us</a></li>
                            <li>Terms & conditions</li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                        <h5 className="heading">ECOSYSTEM</h5>
                        <ul className="card-text">
                            <li><a href="/idos">Launchpad</a></li>
                            <li><a className='disable' href="#">Pools (Soon)</a></li>
                            <li><a className='disable' href="#">Staking (Soon)</a></li>
                            <li><a className='disable' href="#">Games (Soon)</a></li>
                        </ul>
                    </div>
                    <div className="col-md-1 col-sm-1 col-xs-2">
                        <h5 className="heading">Contact</h5>
                        <ul className="card-text">
                            <li>Telegram</li>
                            <li>launchpad@dextools.io</li>
                        </ul>
                    </div>
                </div>
                <div className="row copyright">
                    <div className="col-md-6 col-sm-6 col-xs-6">
                        <div className="pull-left">
                            <p><i className="fa fa-copyright"></i> Copyright @ 2022. Allright Reserved by DEXT FORCE</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                        <div className="mobile-left pull-right mr-4 d-flex policy justify-content-end">
                            <div className='textandprice'>
                                <p className='powered'>ver. 1.0.0  - Power by DEXT Force</p><span className='divider-pr'>|</span>
                                <span className='text-buy'>
                                    <DextPrice/>
                                    <BuyDext/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}




