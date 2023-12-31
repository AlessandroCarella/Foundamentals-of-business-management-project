import { Box } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./scenes/navbar/index"
import Dashboard from "./scenes/dashboard";
import Prediction from "./scenes/prediction/Prediction";
import { Evaluations } from "./scenes/evaluations/Evaluations";


function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
           <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <Navbar/>
              <Routes>
                  <Route path="/dashboard" element={<Dashboard/>} />
                  <Route path="/" element={<Prediction/>} />
                  <Route path="/evaluations" element={<Evaluations/>} />
              </Routes>
           </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
