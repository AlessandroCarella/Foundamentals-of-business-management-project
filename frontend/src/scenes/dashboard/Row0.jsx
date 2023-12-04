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

const Row0 = () => {
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
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();
  return (
    <>
      <DashboardBox gridArea="z">
        <BoxHeader
          title="CPI"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+150%"
        />
        
      </DashboardBox>
      <DashboardBox gridArea="y">
        <BoxHeader
          title="Unemployment Rate"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
       
      </DashboardBox>
      
      <DashboardBox gridArea="x">
        <BoxHeader
          title="Inflation"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        
      </DashboardBox>

      <DashboardBox gridArea="r">
        <BoxHeader
          title="CPI"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        
      </DashboardBox>
      <DashboardBox gridArea="x">
        <BoxHeader
          title="Inflation"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        
      </DashboardBox>

      {/* <DashboardBox gridArea="t">
        <BoxHeader
          title="GDP Index"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={mydata}
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
            <Bar dataKey="pv" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox> */}
    </>
  );
};

export default Row0;
