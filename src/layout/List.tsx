import React from "react";
import ApplyIdo from "../components/common/ApplyIdo";
import ComingPresalesInRow from "../components/presales/ComingInRow";
import LivePresalesInRow from "../components/presales/LiveInRow";
import PastPresalesInRow from "../components/presales/PastInRow";

function List() {
  return (
    <div id="projects-page">
      <div className="dextools-previous-section pt-140 pb-80 md-pb-100">
        <div className="container">
          <div className="project-menu-area d-flex align-items-center justify-content-center">
            <div className="project-left-menu">
              <ul className="nav" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="tab-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#open-igo"
                    type="button"
                    role="tab"
                    aria-controls="open-igo"
                    aria-selected="true"
                  >
                    OPEN IDO
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="tab-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#upcoming"
                    type="button"
                    role="tab"
                    aria-controls="upcoming"
                    aria-selected="false"
                  >
                    Upcoming
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="tab-link"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#past-igo"
                    type="button"
                    role="tab"
                    aria-controls="past-igo"
                    aria-selected="false"
                  >
                    Past IDO
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="open-igo"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="live previous-mainmenu mb-15">
                    <ul className="menu-list">
                      <li className="list1">Project name</li>
                      <li className="list2">Chain</li>
                      <li className="list3">Will finish</li>
                      <li className="list4">Total Raise</li>
                      <li className="list5">Progress</li>
                    </ul>
                  </div>
                </div>
                <LivePresalesInRow></LivePresalesInRow>
              </div>
              <div className="dextools-navigation text-center">
                <ul>
                  <li>
                    <a href="#">
                      <i className="icon-Vector"></i>
                    </a>
                  </li>
                  <li>
                    <a className="active" href="#">
                      1
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-arrow_right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="upcoming"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="upcoming previous-mainmenu mb-15">
                    <ul className="menu-list">
                      <li className="list1">Project name</li>
                      <li className="list2">Chain</li>
                      <li className="list3">Will start</li>
                      <li className="list4">Total Raise</li>
                      <li className="list5">Progress</li>
                    </ul>
                  </div>
                </div>
                <ComingPresalesInRow></ComingPresalesInRow>
              </div>
              <div className="dextools-navigation text-center">
                <ul>
                  <li>
                    <a href="#">
                      <i className="icon-Vector"></i>
                    </a>
                  </li>
                  <li>
                    <a className="active" href="#">
                      1
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-arrow_right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="past-igo"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="past previous-mainmenu mb-15">
                    <ul className="menu-list">
                      <li className="list1">Project name</li>
                      <li className="list2">Chain</li>
                      <li className="list3">Ended</li>
                      <li className="list4">Raised</li>
                      <li className="list5">Progress</li>
                    </ul>
                  </div>
                </div>
                <PastPresalesInRow></PastPresalesInRow>
              </div>
              <div className="dextools-navigation text-center">
                <ul>
                  <li>
                    <a href="#">
                      <i className="icon-Vector"></i>
                    </a>
                  </li>
                  <li>
                    <a className="active" href="#">
                      1
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-arrow_right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ApplyIdo/>
    </div>
  );
}

export default List;
