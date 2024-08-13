import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        size: "large",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
