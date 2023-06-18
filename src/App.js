import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
import RouteRenderer from "./routes/routesConfig/RouteRenderer";

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Avenir Next LT Pro"',
      'sans-serif'
    ].join(','),
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <nav>
        <RouteRenderer />
      </nav>
    </ThemeProvider>
  );
}

export default App;
