import React, { useCallback, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "./Context";
import FormLabel from "@mui/material/FormLabel";

export default function ThirdStep() {
  const {
    formValues,
    handleChange,
    handleNext,
    handleBack,
    variant,
    margin
  } = useContext(AppContext);
  const {
    projectUrl,
    projectDiscord,
    email,
    name,
    projectTelegram
  } = formValues;

  // Check if all values are not empty and if there are some errors
  const isError = useCallback(
    () =>
      Object.keys({
        projectUrl,
        projectDiscord,
        email,
        name,
        projectTelegram
      }).some(
        (name) =>
          (formValues[name].required && !formValues[name].value) ||
          formValues[name].error
      ),
    [formValues, projectUrl, projectDiscord, email, name, projectTelegram]
  );

  return (
    <>
      <h6>Step 3</h6>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <FormLabel id="">Website url</FormLabel>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name="projectUrl"
            placeholder="Your answer"
            value={projectUrl.value}
            onChange={handleChange}
            error={!!projectUrl.error}
            helperText={projectUrl.error}
            required={projectUrl.required}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabel id="">Discord link</FormLabel>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name="projectDiscord"
            placeholder="Your answer"
            value={projectDiscord.value}
            onChange={handleChange}
            error={!!projectDiscord.error}
            helperText={projectDiscord.error}
            required={projectDiscord.required}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabel id="">Telegram group</FormLabel>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name="projectTelegram"
            value={projectTelegram.value}
            onChange={handleChange}
            placeholder="Your answer"
            error={!!projectTelegram.error}
            helperText={projectTelegram.error}
            required={projectTelegram.required}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabel id="">Your email address</FormLabel>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name="email"
            placeholder="Your answer"
            type="email"
            value={email.value}
            onChange={handleChange}
            error={!!email.error}
            helperText={email.error}
            required={email.required}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabel id="">Your name</FormLabel>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name="name"
            placeholder="Your answer"
            value={name.value}
            onChange={handleChange}
            error={!!name.error}
            helperText={name.error}
            required={name.required}
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
          Next step<i className="icon-arrow_right"></i>
        </Button>
      </Box>
    </>
  );
}
