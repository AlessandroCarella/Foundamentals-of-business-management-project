import React, {useState }from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Button, Typography, CircularProgress, Paper, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, } from "@mui/material";
import ResultsTable from "./Results";


export const Evaluations = () => {
  const sampleData = [
    1528545.49,
    1821819.70,
    [1078.27],
    [0.75],
    [0.77],
    0.4,
    0.4,
    0.4,
    0.40,
  ];
  const data = [
    {
      Model: 'Decision Tree',
      'Mean Squared Error': 5703298.60,
      'Mean Absolute Error': 1591.43,
      'R-squared': 0.31,
      'Explained Variance Score': 0.48,
      Accuracy: 0.8,
      Precision: 1.0,
      Recall: 0.8,
      'F1 Score': 0.88,
    },
    {
      Model: 'RidgeModel',
      'Mean Squared Error': [582488.16],
      'Mean Absolute Error': [617.12],
      'R-squared': [0.85],
      'Explained Variance Score': [0.85],
      Accuracy: 0.4,
      Precision: 0.4,
      Recall: 0.4,
      'F1 Score': 0.40,
    },
    {
      Model: 'Elastic Net',
      'Mean Squared Error': [558678.70],
      'Mean Absolute Error': [662.55],
      'R-squared': [0.89],
      'Explained Variance Score': [0.90],
      Accuracy: 0.4,
      Precision: 0.4,
      Recall: 0.4,
      'F1 Score': 0.40,
    },
    {
      Model: 'Lasso',
      'Mean Squared Error': [302263.27],
      'Mean Absolute Error': [352.24],
      'R-squared': [0.92],
      'Explained Variance Score': [0.92],
      Accuracy: 0.8,
      Precision: 0.8,
      Recall: 0.8,
      'F1 Score': 0.8,
    },
    {
      Model: 'LinearRegression',
      'Mean Squared Error': 1078.28,
      'Mean Absolute Error': 0.75,
      'R-squared': 1078.28,
      'Explained Variance Score': 0.75,
      Accuracy: 0.3,
      Precision: 0.3,
      Recall: 0.3,
      'F1 Score': 0.3,
    },
  ];

  const [activeModel, setActiveModel] = useState('');

  const handleActivateModel = (model) => {
    setActiveModel(model);
  };

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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Model</TableCell>
                  <TableCell>Mean Squared Error</TableCell>
                  <TableCell>Mean Absolute Error</TableCell>
                  <TableCell>R-squared</TableCell>
                  <TableCell>Explained Variance Score</TableCell>
                  <TableCell>Accuracy</TableCell>
                  <TableCell>Precision</TableCell>
                  <TableCell>Recall</TableCell>
                  <TableCell>F1 Score</TableCell>
                  <TableCell>Activate Model</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.Model}
                    style={{
                      background: row.Model === activeModel ? "#f7c317f5" : "white",
                      color: "white",
                    }}
                  >
                    <TableCell>{row.Model}</TableCell>
                    <TableCell>{row["Mean Squared Error"]}</TableCell>
                    <TableCell>{row["Mean Absolute Error"]}</TableCell>
                    <TableCell>{row["R-squared"]}</TableCell>
                    <TableCell>{row["Explained Variance Score"]}</TableCell>
                    <TableCell>{row["Accuracy"]}</TableCell>
                    <TableCell>{row["Precision"]}</TableCell>
                    <TableCell>{row["Recall"]}</TableCell>
                    <TableCell>{row["F1 Score"]}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleActivateModel(row.Model)}
                      >
                        Activate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Paper>
  );
};
