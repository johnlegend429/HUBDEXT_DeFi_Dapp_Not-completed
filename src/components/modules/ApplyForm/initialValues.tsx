import { ValidationSchema } from "./Context";

export const initialValues: ValidationSchema = {
  name: {
    value: "",
    error: "",
    required: true,
    minLength: 2,
    maxLength: 20,
    helperText: "Custom error message"
  },
  projectName: {
    value: "",
    error: "",
    required: true,
    minLength: 2,
    maxLength: 20,
    helperText: "Custom error message"
  },
  radio: {
    value: "",
    error: "",
    required: true,
    validate: "checkbox",
    minLength: 2,
    maxLength: 20
  },
  howMuch: {
    value: "",
    error: "",
    required: false,
    minLength: 1,
    maxLength: 20,
    helperText: "Custom error message"
  },
  aboutProject: {
    value: "",
    error: "",
    required: true,
    minLength: 2
  },
  email: {
    value: "",
    error: "",
    validate: "email"
  },
  status: {
    value: "",
    error: "",
    required: true,
    validate: "select"
  },
  date: {
    value: "",
    error: ""
  },
  city: {
    value: "",
    error: "",
    validate: "text",
    minLength: 3,
    maxLength: 20
  },
  agreenemt: {
    value: false,
    error: "",
    required: true,
    validate: "checkbox",
    helperText: "Please accept our terms and conditions"
  },
  funded: {
    value: false,
    error: "",
    required: true,
    validate: "checkbox",
    helperText: "Please accept our terms and conditions"
  },
  teamInfo: {
    value: false,
    error: "",
    required: false,
    validate: "checkbox",
    helperText: "Please accept our terms and conditions"
  },
  chainProject: {
    value: false,
    error: "",
    required: false,
    validate: "checkbox",
    helperText: "Please accept our terms and conditions"
  },
  plannedRaise: {
    value: "",
    error: "",
    minLength: 1,
    maxLength: 20
  },
  tokenDesc: {
    value: "",
    error: "",
    minLength: 3,
    maxLength: 20
  },
  projectUrl: {
    value: "",
    error: "",
    required: false,
    minLength: 3
  },
  projectDiscord: {
    value: "",
    error: "",
    required: false,
    minLength: 3
  },
  projectTelegram: {
    value: "",
    error: "",
    required: false,
    minLength: 3
  },
  phone: {
    value: "",
    error: "",
    validate: "phone",
    maxLength: 15
  }
};
