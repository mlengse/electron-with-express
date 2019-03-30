import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { MuiThemeProviderProps } from "@material-ui/core/styles/MuiThemeProvider";
// import { createGenerateClassName } from "@material-ui/styles";
import { /*GenerateClassName,*/ SheetsRegistry } from "jss";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700]
    },
    secondary: {
      light: grey[300],
      main: grey[500],
      dark: grey[700]
    }
  }
});

export interface PageContext extends MuiThemeProviderProps {
  theme: Theme;
  //generateClassName: GenerateClassName<string>; // not sure what goes here
  sheetsRegistry: SheetsRegistry;
  sheetsManager: Map<any, any>;
}

export default function(): PageContext {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry()
    // The standard class name generator.
    //generateClassName: createGenerateClassName()
    //children: undefined
  };
}
