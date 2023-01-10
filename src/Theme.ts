import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface Theme {
        additionalColors: {
            heading: string,
            background: {
              light: string,
              main: string,
              white: string,
            }
        };
    }
  
    interface ThemeOptions {
        additionalColors: {
          heading?: string;
          background?: {
            light?: string,
            main?: string,
            white?: string,
          }
        }
    }
  };

export const theme = createTheme({
    typography: {
      fontFamily: [
        "Rubik",
        "sans-serif"
      ].join(','),
    },
    additionalColors: {
      heading: "#002244",
      background: {
        light: "#F0F8FF",
        white: "#FFF",
      },
    },
    palette: {
        action: {
            hover: "#F0F8FF",
            focus: "#F0F8FF"
        }
    },
    // style overriding for components globally
    components: {
        MuiInput: {
            styleOverrides: {
                input: {
                    fontSize: "15px",
                    ":focus": {
                        backgroundColor: "#F0F8FF",
                        borderRadius: "4px"
                    },
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: "13px",
                }
            }
        }
    }
  });