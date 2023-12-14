import React from "react";
import { Box } from "@mui/material";
import Slider from "@mui/material/Slider";

const ParamSliders = ({
  name,
  defaultValue,
  value,
  step,
  min,
  max,
  handleChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        height: 100,
        borderRadius: 1,
      }}
    >
      <>{name}</>

      <>
        <Slider
          aria-label="Small steps"
          defaultValue={defaultValue}
          step={step}
          marks
          min={min}
          max={max}
          valueLabelDisplay="auto"
          onChange={handleChange}
          name={name}
          value={value}
        />
      </>
    </Box>
  );
};

export default ParamSliders;
