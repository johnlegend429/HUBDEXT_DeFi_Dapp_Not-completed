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

export default function SecondStep() {
  const {
    formValues,
    handleChange,
    handleNext,
    handleBack,
    variant,
    margin
  } = useContext(AppContext);
  const { teamInfo, chainProject, plannedRaise, tokenDesc } = formValues;

  // Check if all values are not empty and if there are some errors
  const isError = useCallback(
    () =>
      Object.keys({ teamInfo, chainProject, plannedRaise, tokenDesc }).some(
        (name) =>
          (formValues[name].required && !formValues[name].value) ||
          formValues[name].error
      ),
    [formValues, teamInfo, chainProject, plannedRaise, tokenDesc]
  );
  return (
    <>
      <h6>Step 2</h6>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Is your team Anon or public?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="teamInfo"
              onChange={(e) => {
                handleChange(e, true);
              }}
              value={teamInfo.value}
            >
              <FormControlLabel value="Anon" control={<Radio />} label="Anon" />
              <FormControlLabel
                value="Public"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="Mixed"
                control={<Radio />}
                label="Mixed"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Is your project designed for BSC or are you migrating from
              somewhere else?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="chainProject"
              onChange={(e) => {
                handleChange(e, true);
              }}
              value={chainProject.value}
            >
              <FormControlLabel
                value="Designed for BSC First"
                control={<Radio />}
                label="Designed for BSC First"
              />
              <FormControlLabel
                value="Migrating"
                control={<Radio />}
                label="Migrating"
              />
              <FormControlLabel
                value="Keeping both"
                control={<Radio />}
                label="Keeping both"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabel id="">
            How much are you planning on raising on the IDO?
          </FormLabel>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name="plannedRaise"
            placeholder="Your anwser"
            value={plannedRaise.value}
            onChange={handleChange}
            error={!!plannedRaise.error}
            helperText={plannedRaise.error}
            required={plannedRaise.required}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabel id="">
            Can you describe simply the token use case?
          </FormLabel>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name="tokenDesc"
            placeholder="Your anwser"
            value={tokenDesc.value}
            onChange={handleChange}
            error={!!tokenDesc.error}
            helperText={tokenDesc.error}
            required={tokenDesc.required}
          />
        </Grid>
      </Grid>

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
          disabled={isError()}
          onClick={!isError() ? handleNext : () => null}
        >
          Next step <i className="icon-arrow_right"></i>
        </Button>
      </Box>
    </>
  );
}
