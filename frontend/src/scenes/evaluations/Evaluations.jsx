import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Button, Typography, CircularProgress, Paper } from "@mui/material";
import ResultsTable from "./Results";

export const Evaluations = () => {
  const sampleData = [
    1528545.4962516,
    1821819.7091836,
    [1173.9812, 1078.2756],
    [0.81629377, 0.75157505],
    [0.92111922, 0.77607818],
    0.4,
    0.4,
    0.4,
    0.4000000000000001,
  ];

  return (
    <Paper elevation={3}>
      <Box
        display={"flex-col"}
        alignItems={"center"}
        alignContent={"center"}
        justifyContent={"center"}
        m={10}
      >
        <Typography variant="h5" gutterBottom align="center" fontSize={30}>
          Model Evaluation
        </Typography>

        <Box
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          pb={10}
        >
          <ResultsTable data={sampleData} />
        </Box>
      </Box>
    </Paper>
  );
};
