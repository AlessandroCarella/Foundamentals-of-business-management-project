import React from "react";
import DashboardBox from "../../component/DashboardBox";
import { useGetKpisQuery } from "../../state/api";
import { useTheme } from "@mui/material";
import BoxHeader from "../../component/BoxHeader";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from "recharts";

const Row1 = () => {
  const mydata = [
    {
      name: "2018 ",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "2019",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "2020",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "2021",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "2022",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "2023",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "2024",
      uv: 3490,
      pv: 4300,
    },
  ];

  const strigency = [
    {
      name: "2018 ",
      si: 0,
    },
    {
      name: "2019",
      si: 0,
    },
    {
      name: "2020",
      si: 82.41,
    },
    {
      name: "2021",
      si: 53.5,
    },
    {
      name: "2022",
      si: 21.99,
    },
    {
      name: "2023",
      si: 21.99,
    },
  ];

  const ebit_gdp = [
    {
      name: "2018 ",
      ebit: 1809.45,
      netIncome: 1714.57,
    },
    {
      name: "2019",
      ebit: 2001.92,
      netIncome: 1554.34,
    },
    {
      name: "2020",
      ebit: -338.72,
      netIncome: -178.96,
    },
    {
      name: "2021",
      ebit: 1713.75,
      netIncome: 1521.15,
    },
    {
      name: "2022",
      ebit: 3015.12,
      netIncome: 5216.16,
    },
    {
      name: "2023",
      ebit: 3015.12,
      netIncome: 5216.16,
    },
  ];

  const ppi_cpi = [
    {
      name: "2018 ",
      ppi: 3.2,
      cpi: 1.1,
    },
    {
      name: "2019",
      ppi: 3.4,
      cpi: 0.6,
    },
    {
      name: "2020",
      ppi: 1.9,
      cpi: -0.1,
    },
    {
      name: "2021",
      ppi: 9.9,
      cpi: 1.9,
    },
    {
      name: "2022",
      ppi: 25,
      cpi: 7.3,
    },
    {
      name: "2023",
      ppi: 25,
      cpi: 7.3,
    },
  ];

  const { palette } = useTheme();
  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="PPI vs CPI from  2018 - 2023"
          subtitle="top line represents PPI, bottom line represents CPI"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={ppi_cpi}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[-1, 30]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="ppi"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="cpi"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Earning before Income tax and Net Income"
          subtitle="top line represents EBIT, bottom line represents Net Income"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={ebit_gdp}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0%" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor={palette.tertiary[500]} />
                <stop offset={`80%`} stopColor={palette.tertiary[500]} />
                <stop offset={`80%`} stopColor={"#cfceef"} />
                <stop offset={`${100}%`} stopColor={"#cfceef"}/>
              </linearGradient>

              <linearGradient id="colorUv1" x1="0%" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor={palette.primary.main} />
                <stop offset={`80%`} stopColor={palette.primary.main} />
                <stop offset={`80%`} stopColor={"#b6c2b3"} />
                <stop offset={`${100}%`} stopColor={"#b6c2b3"}/>
              </linearGradient>
            </defs>
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
              dataKey="ebit"
              stroke="url(#colorUv)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="netIncome"
              stroke="url(#colorUv1)"
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Strigency Index by Year"
          subtitle="graph representing the strigency index from 2018 - 2022"
          sideText="0%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={strigency}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="si" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
