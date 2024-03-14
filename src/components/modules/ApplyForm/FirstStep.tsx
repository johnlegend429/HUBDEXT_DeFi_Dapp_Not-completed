import React, { useCallback, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "./Context";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function FirstStep() {
  const { formValues, handleChange, handleNext, variant, margin } = useContext(
    AppContext
  );
  const { projectName, aboutProject, email, status, howMuch } = formValues;

  // Check if all values are not empty and if there are some errors
  const isError = useCallback(
    () =>
      Object.keys({ projectName, aboutProject, email, status, howMuch }).some(
        (name) =>
          (formValues[name].required && !formValues[name].value) ||
          formValues[name].error
      ),
    [formValues, projectName, aboutProject, email, status, howMuch]
  );

  return (
    <>
      <h6>Step 1</h6>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <FormLabel id="">Project Name</FormLabel>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name="projectName"
            placeholder="Your first name"
            value={projectName.value}
            onChange={handleChange}
            error={!!projectName.error}
            helperText={projectName.error}
            required={projectName.required}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabel id="">What is your project about?</FormLabel>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name="aboutProject"
            placeholder="Tell us about your project"
            value={aboutProject.value}
            onChange={handleChange}
            error={!!aboutProject.error}
            helperText={aboutProject.error}
            required={aboutProject.required}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabel id="">What is the status of your project?</FormLabel>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            select
            SelectProps={{
              native: true
            }}
            name="status"
            value={status.value}
            onChange={handleChange}
            error={!!status.error}
            helperText={status.error}
            required={status.required}
          >
            <option value="">Select the status </option>
            <option value="Just an initial idea">Just an initial idea</option>
            <option value="Idea with White Paper">Idea with White Paper</option>
            <option value="In early development">In early development</option>
            <option value="In late stage of development">
              In late stage of development
            </option>
            <option value="Ready to launch<">Ready to launch</option>
            <option value="Already launched">Already launched</option>
          </TextField>
        </Grid>
        {/*         <Grid item xs={12} sm={12}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Select the status of your project</FormLabel>
            <RadioGroup 
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
            >   
                <Grid item xs={12} sm={12}>
                    <FormControlLabel value="initial-idea" control={<Radio  />} label="Just an initial idea" />
                    <FormControlLabel value="whitepaper-idea" control={<Radio />} label="Idea with White Paper" />
                    <FormControlLabel value="early-dev" control={<Radio />} label="in early development" />
                </Grid>    
                <Grid item xs={12} sm={12}>
                    <FormControlLabel value="late-dev" control={<Radio />} label="In late stage of development" />
                    <FormControlLabel value="ready" control={<Radio />} label="Ready to launch" />
                    <FormControlLabel value="already" control={<Radio />} label="Already launched" />
                </Grid>   
            </RadioGroup>
            </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Have you already raides funds?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <Grid item xs={12} sm={12}>
                <FormControlLabel
                  value="funds-yes"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="funds-no"
                  control={<Radio />}
                  label="No"
                />
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabel id="">How much?</FormLabel>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name="howMuch"
            placeholder="BUSD/USDT"
            error={!!howMuch.error}
            value={howMuch.value}
            onChange={handleChange}
            helperText={howMuch.error}
          />
        </Grid>
      </Grid>
      <Box
        className="bottom-buttons-apply"
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          className="apply-ido back black-shape opacity"
          sx={{ mt: 3, ml: 1 }}
        >
          Back
        </Button>
        <Button
          className="apply-ido black-shape"
          sx={{ mt: 3, ml: 1 }}
          disabled={isError()}
          onClick={!isError() ? handleNext : () => null}
        >
          Next step <i className="icon-arrow_right"></i>
        </Button>
      </Box>
    </>
  );
}
