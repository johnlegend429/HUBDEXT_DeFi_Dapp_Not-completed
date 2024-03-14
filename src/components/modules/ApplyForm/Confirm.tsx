import React, { useContext, useRef } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { AppContext } from "./Context";

function onChange(value: any) {
  console.log("Captcha value:", value);
}
 

export default function Confirm() {
  const formData = new FormData();
  const { formValues, handleBack, handleNext } = useContext(AppContext);
  const {
    projectName,
    aboutProject,
    email,
    status,
    howMuch,
    plannedRaise,
    tokenDesc,
    name,
    projectDiscord,
    projectUrl,
    chainProject,
    teamInfo
  } = formValues;

  const handleSubmit = () => {
    // Remove unwanted properties from formValue object
    let form = {};

    Object.keys(formValues).map((name) => {
      form = {
        ...form,
        [name]: formValues[name].value
      };
      return form;
    });
    // destructuring values
    let {
      name,
      projectName,
      howMuch,
      aboutProject,
      email,
      status,
      teamInfo,
      chainProject,
      plannedRaise,
      tokenDesc,
      projectUrl,
      projectTelegram
    }: any = form;

    // console.log(form);
    //required headers for google forms
    let headers = {
      HOST: "docs.google.com",
      "Content-Type": "application/x-www-form-urlencoded"
    };
    //adding key and value pairs to body
    formData.append("entry.35283798", projectName);
    formData.append("entry.1387174952", aboutProject);
    formData.append("entry.207011796", howMuch);
    formData.append("entry.1885776424", plannedRaise);
    formData.append("entry.928612429", teamInfo);
    formData.append("entry.112669129", chainProject);
    formData.append("entry.1474912732", tokenDesc);
    formData.append("entry.1890082096", projectUrl);
    formData.append("entry.410042800", "medium link option not shared");
    formData.append("entry.2122286255", projectTelegram);
    formData.append("entry.1029098002", "twitter link option not shared");
    formData.append("entry.344588223", email);
    formData.append("entry.2033840112", name);
    formData.append("entry.728399664", status);
    formData.append("entry.1371601007", "Yes");

    //google form url
    let url =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd3pKKzi5ihiZ2bVaucnJw76zX2UAG3oBVxFnXkRwtsxdRIAA/formResponse";

    //post req to submit data
    axios.post(url, formData, {
      headers: headers
    });

    // Show last component or success message
    handleNext();
  };


  const recaptchaRef = useRef(null)

  return (
    <>
      <List  className="review-div" disablePadding>
        <ListItem>
          <ListItemText
            primary="Project Name"
            secondary={projectName.value || "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Project About"
            secondary={aboutProject.value || "Not Provided"}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Project status"
            secondary={status.value || "Not Provided"}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Raised funds ( BUSD or USDT )"
            secondary={howMuch.value || "Not Provided"}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Is your team Anon or public?"
            secondary={teamInfo.value || "Not Provided"}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Is your project designed for BSC or are you migrating from somewhere else?"
            secondary={chainProject.value || "Not Provided"}
          />
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemText
            primary="Email Address"
            secondary={email.value || "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="How much are you planning on raising on the IDO?"
            secondary={plannedRaise.value || "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Can you describe simply the token use case?"
            secondary={tokenDesc.value || "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Website url"
            secondary={projectUrl.value || "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Discord link"
            secondary={projectDiscord.value || "Not Provided"}
          />
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemText
            primary="Your email address"
            secondary={email.value || "Not Provided"}
          />
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemText
            primary="Your name"
            secondary={name.value || "Not Provided"}
          />
        </ListItem>
      </List>
      <Box
        className="bottom-buttons-apply"
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          className="apply-ido back black-shape"
          sx={{ mt: 3, ml: 1 }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          className="apply-ido black-shape"
          sx={{ mt: 3, ml: 3 }}
          onClick={handleSubmit}
        >
          Confirm and submit<i className="icon-arrow_right"></i>
        </Button>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="6Lfv7jMhAAAAAJbk0LqUmnUSzsHiy_8rWeB0Qid-"
        />
      </Box>
    </>
  );
}
