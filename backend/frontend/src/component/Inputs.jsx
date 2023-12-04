import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const Inputs = ({ key, inputName, handleTextChange, value }) => {
  return (
    <>
      
      <TextField
        key={key}
        label={inputName}
        name={inputName}
        id="filled-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>,
        }}
        variant="filled"
        onChange={handleTextChange}
        defaultValue={value}
        
      />
    </>
  );
};

export default Inputs;
