import React from "react";
import DashboardBox from "../../component/DashboardBox";
import FlexBetween from "../../component/FlexBetween";
import BoxHeader from "../../component/BoxHeader";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const pieChartData = [
    [
      {
        name: "Revenue",
        value: 120333,
      },
      {
        name: `Expenses`,
        value: 11028,
      }
    ]
    
  ];

  const pieData = [
    { name: "Group A", value: 5874 },
    { name: "Group B", value: 8220 },
  ];

  const productData = [
    { id: 2018, ebit: 729, usage: '5%', afterTax: 692 },
    { id: 2019, ebit: 734, usage: '3%', afterTax: 711 },
    { id: 2020, ebit: 748, usage: '9%', afterTax: 683 },
    { id: 2021, ebit: 656, usage: '0%', afterTax: 656 },
    { id: 2022, ebit: 662, usage: '7%', afterTax: 615 },
    { id: 2023, ebit: 956, usage: '2%', afterTax: 936 }
    // { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    // { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    // { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const transactionData = [
    { id: 1, name: "bank 1",numberEmp:  87352, costEmp: 0.04, totalCostEmp: 37777 },
    { id: 2, name: "bank 2",numberEmp: 20825, costEmp: 0.08, totalCostEmp: 1648 },
    { id: 3, name: "bank 3",numberEmp: 10751, costEmp: 0.34, totalCostEmp: 36500 },
    { id: 4, name: "bank 4",numberEmp: 91338, costEmp:  0.07, totalCostEmp: 12504  },
    { id: 5, name: "bank 5",numberEmp: 20563, costEmp: 0.08, totalCostEmp:  33584},
   
  ];

  const transactionColumns = [
    {
      field: "name",
      headerName: "Bank",
      flex: 0.3,
    },
    {
      field: "numberEmp",
      headerName: "Number of Employees",
      flex: 0.5,
    },
    {
      field: "costEmp",
      headerName: "Cost Per Emp.",
      flex: 0.67,
    },
    {
      field: "totalCostEmp",
      headerName: "Total Cost per Emp.",
      flex: 0.5,
      renderCell: (GridCellParams) => `${GridCellParams.value}`,
    }
  ];


  const productColumns = [
    {
      field: "id",
      headerName: "Year",
      flex: 0.4,
    },
    {
      field: "ebit",
      headerName: "Earnings Before Income Tax (EBIT)",
      flex: 0.8,
      renderCell: (GridCellParams) => `€ ${GridCellParams.value}`,
    },
    {
      field: "usage",
      headerName: "% Taxed",
      flex: 0.5,
      renderCell: (GridCellParams) => {
        const value = GridCellParams.value;
        let cellColor = 'black'; // Default color
    
        // Example: Change color to red if the value is greater than 5%
        if (parseFloat(value) > 5) {
          cellColor = 'red';
        }
    
        return (
          <span style={{ color: cellColor }}>
            `{GridCellParams.value}`
          </span>
        );
      },
    },
    {
      field: "afterTax",
      headerName: "Revenue",
      flex: 0.5,
      renderCell: (GridCellParams) => `€ ${GridCellParams.value}`,
    },
  ];

  

  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="Revenue before Income tax (millions)"
          sideText={`...`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Employees"
          sideText={`:`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Operating Expense Ratio" sideText="..." />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Percentage</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              71,45 %
            </Typography>
            <Typography variant="h6">
              {/* Finance profit of the fiscal year */}
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Operating Cost (millions) </Typography>
            <Typography variant="h6"> 5874 </Typography>
            <Typography mt="0.4rem" variant="h5">
              Revenue (millions) 
            </Typography>
            <Typography variant="h6">
                8220
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      {/* <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText=":" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox> */}
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Expected Net Income Compared to Last Year"
          sideText="+89%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="89%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Suggests a comparison of the anticipated net income of resources (e.g., money, investments, revenue) in the current period with that of the previous year. 
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
