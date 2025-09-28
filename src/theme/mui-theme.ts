import { createTheme } from "@mui/material/styles"
/**
 * Material UI theme configuration for the application.
 *
 * Defines:
 * - Primary and secondary color palette
 * - Typography
 * - Global component overrides (if any)
 *
 * Used throughout the app via ThemeProvider.
 */

const theme = createTheme({
  palette: {
    primary: {
      main: "#0076C0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#154BB7",
      contrastText: "#fff",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: "#f9f9f9",
    },
    text: {
      primary: "#353535",
    },
  },
  typography: {
    fontFamily: "NeueMontreal, Arial, sans-serif",
  },
  components: {
    MuiTabs: {
    styleOverrides: {
      root: {
        backgroundColor: "#f5f5f5", 
        borderBottom: "1px solid #ddd",
        minHeight: "unset",
      },
      indicator: {
        display: "none", 
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 500,
        fontSize: "0.95rem",
        minHeight: "60",
        padding: "8px 20px",
        backgroundColor: "#f5f5f5", 
        "&.Mui-selected": {
          color: "var(--color-brand)",
          backgroundColor: "rgba(21, 75, 183, 0.1)", 
          borderBottom: "2px solid var(--color-brand)",
        },
      },
    },
  },
  },
})

export default theme
