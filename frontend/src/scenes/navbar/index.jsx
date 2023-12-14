import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../component/FlexBetween";
import PixIcon from "@mui/icons-material/Pix";

const Navbar = () => {
  const { palette } = useTheme();

  const location = useLocation();
  const currentPath = location.pathname;

  console.log("Current P ", currentPath);
  
  const [selected, setSelected] = useState("predictions");
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          CPCJ
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/dashboard"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" && currentPath  != "/evaluations" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            predictions
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[400] } }}>
          <Link
            to="/evaluations"
            onClick={() => setSelected("evaluation")}
            style={{
              color: selected === "evaluation" || currentPath  === "/evaluations"? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Evaluation
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );

  Pix;
};

export default Navbar;
