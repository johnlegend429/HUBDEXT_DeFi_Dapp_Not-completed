import React from "react";
import { StepsProvider } from "../components/modules/ApplyForm/Context";
import StepForm from "../components/modules/ApplyForm/StepForm"



function Sendproject() {
  return (
    <div id="send-project-page">
      <div className="container">
        <div
            className="sec-inner align-items-center d-flex justify-content-center wow fadeInUp mb-50 pt-140"
            data-wow-delay="0.2s"
            data-wow-duration="0.4s"
            >
              <div className="sec-heading text-center">
                <div className="sub-inner">
                  <span className="sub-title">Send your project</span>
                </div>
                <h2 className="mb-0 title xs-pb-20">New projects incubation</h2>
              </div>
        </div>
        <StepsProvider>
          <StepForm/>
        </StepsProvider>
      </div>
    </div>
  );
}

export default Sendproject;
