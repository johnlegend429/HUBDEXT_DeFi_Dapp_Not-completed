import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Details from "./layout/Details";
import Home from "./layout/Home";
import List from "./layout/List";
import Sendproject from "./layout/Sendproject";
import { Helmet } from "react-helmet";
import Web3 from "web3";
import { WalletService } from "./services/wallet";
import { ScrollTop } from './components/common/ScrollTop';
import { defaults } from '@pnotify/core';
import { defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import Locks from "./layout/Locks";
import { ethers } from "ethers";

defaultModules.set(PNotifyMobile, {});
defaults.styling = 'material';

function getLibrary(provider: any) {
  WalletService.Web3Instance = new Web3(provider);
  WalletService.EthersInstance = new ethers.providers.Web3Provider(provider);
  return WalletService.Web3Instance;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <ScrollTop>
          <Header></Header>
          <React.StrictMode>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="details/:address" element={<Details/>}/>
              <Route path="idos" element={<List/>}/>
              <Route path="locks/:address" element={<Locks/>}/>
              <Route path="send-project" element={<Sendproject/>}/>
            </Routes>
          </React.StrictMode>
        </ScrollTop>
      </BrowserRouter>
      <Footer></Footer>
      <Helmet>
        <script src="/assets/js/main.js" async></script>
      </Helmet>
    </Web3ReactProvider>
  </div>
);
