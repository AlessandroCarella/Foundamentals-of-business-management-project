import React from "react";
import DashboardBox from "../../component/DashboardBox";
import FlexBetween from "../../component/FlexBetween";
import BoxHeader from "../../component/BoxHeader";
import { Box, Typography, useTheme } from "@mui/material";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Legend,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const Row2 = () => {
  const sdata = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];

  const pieData = [
    { name: "Group A", value: 8220 },
    { name: "Group B", value: 1435 },
  ];

  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];

  const mydata = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const gdp_emp = [
    {
      name: "2018 ",
      gdp: 0.9,
      unemployment: 10.6,
    },
    {
      name: "2019",
      gdp: 0.5,
      unemployment: 9.9,
    },
    {
      name: "2020",
      gdp: -9,
      unemployment: 9.2,
    },
    {
      name: "2021",
      gdp: 7,
      unemployment: 9.5,
    },
    {
      name: "2022",
      gdp: 3.4,
      unemployment: 8.16,
    },
    {
      name: "2023",
      gdp: 3.4,
      unemployment: 8.16,
    },
  ];

  const fx_ir = [
    {
      name: "2018 ",
      fx: 0.85,
      ir: 1.6,
    },
    {
      name: "2019",
      fx: 0.89,
      ir: 1.6,
    },
    {
      name: "2020",
      fx: 0.88,
      ir: 0.7,
    },
    {
      name: "2021",
      fx: 0.85,
      ir: 1.4,
    },
    {
      name: "2022",
      fx: 0.95,
      ir: -0.4,
    },
    {
      name: "2023",
      fx: 0.95,
      ir: -0.4,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader title="GDP vs Unemployment Rate" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={gdp_emp}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="gdp"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="unemployment"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Profit Margin" sideText="..." />
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
              17,45 %
            </Typography>
            <Typography variant="h6">
              Finance profit of the fiscal year
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Profit of the year (millions) </Typography>
            <Typography variant="h6"> 1435 </Typography>
            <Typography mt="0.4rem" variant="h5">
              Net Profit - Financ. Activit. (millions) 
            </Typography>
            <Typography variant="h6">
                8220
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="f">
        <BoxHeader
          title="Exchangre Rate vs Interest Rates"
          subtitle="top line represents Interes Rates, bottom line represents Exchange Rate (FX)"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={fx_ir}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="fx"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="ir"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* <DashboardBox gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="x"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={sdata}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox> */}
    </>
  );
};

export default Row2;
