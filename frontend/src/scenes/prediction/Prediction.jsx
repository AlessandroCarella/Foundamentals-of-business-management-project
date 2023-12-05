import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Button, Typography, CircularProgress, Paper } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Slider from "@mui/material/Slider";
import ParamSliders from "../../component/ParamSliders";
import axios from "axios";
import Papa from "papaparse";
import Inputs from "../../component/Inputs";

const Prediction = () => {
  const sliderItems = [
    {
      name: "GDPIndex",
      defaultValue: 3.7,
      value: 0,
      step: 0.5,
      min: -16,
      max: +20,
    },
    {
      name: "PPI",
      defaultValue: 3.7,
      value: 0,
      step: 0.5,
      min: -2,
      max: 30,
    },
    {
      name: "UnemploymentRate",
      defaultValue: 1,
      value: 0,
      step: 1,
      min: 1,
      max: 50,
    },
    {
      name: "ExchangesRatesPercentage",
      defaultValue: 3.7,
      value: 0,
      step: 0.5,
      min: -16,
      max: +20,
    },
    {
      name: "CPIIndex",
      defaultValue: 3.7,
      value: 0,
      step: 0.5,
      min: -2,
      max: 30,
    },
    {
      name: "CovidStringencyIndex",
      defaultValue: 1,
      value: 0,
      step: 1,
      min: 1,
      max: 50,
    },
    {
      name: "RealInterestRate",
      defaultValue: 3.7,
      value: 0,
      step: 0.5,
      min: -2,
      max: 30,
    },
    {
      name: "CostPerEmployee",
      defaultValue: 1,
      value: 0,
      step: 1,
      min: 1,
      max: 50,
    },
  ];

  const [backendAverage, setBackendAverage] = useState();


  const [prediction, setPrediction] = useState();
  const [values, setValues] = useState({
    MargineDiInteresse: backendAverage ? backendAverage.MargineDiInteresse : 0,
    CommissioniNette: backendAverage ? backendAverage.CommissioniNette : 0 ,
    MargineDiIntermediazione: 5,
    RisultatoNettoDellaGestioneFinanziaria: 1,
    CostiOperativi: 2,
    SpeseAmministrative: 3,
    GDPIndex: 0,
    PPI: 0,
    UnemploymentRate: 0,
    ExchangesRatesPercentage: 0,
    CPIIndex: 0,
    CovidStringencyIndex: 0,
    RealInterestRate: 0,
    CostPerEmployee: 0,
  });

  const inputFileds = [
    {
      id: "11",
      name: "MargineDiInteresse",
      placeholder: "",
      type: "text",
      label: "MargineDiInteresse",
    },
    {
      id: "12",
      name: "CommissioniNette",
      placeholder: "",
      type: "text",
      label: "CommissioniNette",
    },
    {
      id: "13",
      name: "MargineDiIntermediazione",
      placeholder: "",
      type: "text",
      label: "MargineDiIntermediazione",
    },
    {
      id: "14",
      name: "RisultatoNettoDellaGestioneFinanziaria",
      placeholder: "",
      type: "text",
      label: "RisultatoNettoDellaGestioneFinanziaria",
    },
    {
      id: "15",
      name: "CostiOperativi",
      placeholder: "",
      type: "text",
      label: "CostiOperativi",
    },
    {
      id: "16",
      name: "SpeseAmministrative",
      placeholder: "",
      type: "text",
      label: "SpeseAmministrative",
    },
  ];

  const handleTextChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log("Here are the values of Inputs ", values);
  };

  async function postData() {
    const url = "http://127.0.0.1:8000/predict/";
    const data = {
      key2: [
        "Utile(perdita)DellaOperativitaCorrenteAlLordoDelleImposte",
        "Utile(perdita)DellaOperativitaCorrenteAlNettoDelleImposte",
      ],
      key3: ["Anno", "Banca"],
      key1: JSON.stringify(prediction[0]),
      path: "./AAA_prediction/predictdata.csv",
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          // Add any other headers if needed
        },
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function fetchData() {
    const response = await fetch("http://127.0.0.1:8000/");
    const data = await response.json();
    console.log(data); // Output: { message: 'Hello from the server!' }
  }

  const handleChange = (e) => {
    //console.log(e, i, activeThumb);
    setValues({ ...values, [e.target.name]: e.target.value });
    //console.log("GDP is ", values);
  };

  function valuetext(value) {
    return `${value}°C`;
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const { palette } = useTheme();
  //const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          // result.data contains the parsed CSV data
          //console.log(result.data);
          setPrediction(result.data);
        },
        header: true, // Set to true if your CSV has headers
      });
    }

    // Perform your file upload logic here

    // For demonstration purposes, simulate a delay with setTimeout
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Paper elevation={3}>
      <Box
        display={"flex"}
        alignItems={"center"}
        alignContent={"center"}
        justifyContent={"center"}
        gap={10}
      >
        {/* left side of pred. page - Import */}
        <Box
          display={"flex-col"}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          alignSelf={"center"}
          gap={10}
        >
          <Box
            display="flex-col"
            alignItems="center"
            gap="1.5rem"
            mt="40px"
            textAlign={"center"}
            color={palette.secondary[500]}
            sx={{
              fontFamily: "Raleway",
            }}
          >
            <Typography variant="h5" gutterBottom>
              CSV Upload
            </Typography>
            <input
              accept=".csv"
              id="csv-upload"
              type="file"
              style={{
                display: "none",
              }}
              onChange={handleFileUpload}
            />
            <label htmlFor="csv-upload">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<NightsStayIcon />}
              >
                Upload CSV
              </Button>
            </label>
            {loading && <CircularProgress />}
          </Box>

          {/* Inputs for numeric values */}
          <Box
            display={"flex-col"}
            alignItems={"center"}
            alignContent={"center"}
            justifyContent={"center"}
            mt={10}
          >
            <div>
              {inputFileds.slice(0, 3).map((input) => {
                return (
                  <Inputs
                    key={input.id}
                    inputName={input.name}
                    {...input}
                    value={values[input.name]}
                    handleTextChange={handleTextChange}
                  />
                );
              })}
            </div>

            <div>
              {inputFileds.slice(3, 6).map((input) => {
                return (
                  <Inputs
                    key={input.id}
                    inputName={input.name}
                    {...input}
                    value={values[input.name]}
                    handleTextChange={handleTextChange}
                  />
                );
              })}
            </div>
          </Box>
        </Box>

        {/* end left side of pred. page - Import */}

        {/* right side of pred. page */}
        {prediction ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignContent={"center"}
            alignItems={"center"}
            flexGrow={1}
          >
            <Typography component="div">
              <Box sx={{ fontWeight: "bold", m: 1 }}>
                {" "}
                Prediction parameters
              </Box>
            </Typography>

            {/* Create  side by side divs for params 1-6. 3 pm each side */}

            <Box
              display={"flex"}
              flexDirection={"row"}
              alignContent={"center"}
              alignItems={"center"}
              width={"100%"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignContent={"center"}
                width="100%"
                height="100%"
              >
                {sliderItems.slice(0,4).map((item, index) => (
                  <ParamSliders
                    key={index}
                    name={item.name}
                    defaultValue={item.defaultValue}
                    step={item.step}
                    min={item.min}
                    max={item.max}
                    handleChange={handleChange}
                  />
                ))}

                <Button
                  variant="contained"
                  color="secondary"
                  component="span"
                  startIcon={<NightsStayIcon />}
                  onClick={fetchData}
                >
                  Get
                </Button>
              </Box>

              <Box
                display={"flex"}
                flexDirection={"column"}
                alignContent={"center"}
                width="100%"
                height="100%"
              >
               {sliderItems.slice(4,8).map((item, index) => (
                  <ParamSliders
                    key={index}
                    name={item.name}
                    defaultValue={item.defaultValue}
                    step={item.step}
                    min={item.min}
                    max={item.max}
                    handleChange={handleChange}
                  />
                ))}

                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<NightsStayIcon />}
                  onClick={postData}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignContent={"center"}
            alignItems={"center"}
            flexGrow={1}
          >
            <Typography component="div">
              <Box sx={{ fontWeight: "bold", m: 1 }}>
                {" "}
                Upload Dataset to use prediction parameters
              </Box>
            </Typography>

            {/* Create  side by side divs for params 1-6. 3 pm each side */}

            <Box
              display={"flex"}
              flexDirection={"row"}
              alignContent={"center"}
              alignItems={"center"}
              width={"100%"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignContent={"center"}
                width="100%"
                height="100%"
              >
                {sliderItems.slice(0, 1).map((item, index) => (
                  <ParamSliders
                    key={index}
                    name={item.name}
                    defaultValue={item.defaultValue}
                    step={item.step}
                    min={item.min}
                    max={item.max}
                    handleChange={handleChange}
                  />
                ))}

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
                  <Item>CPI</Item>

                  <>
                    <Slider
                      aria-label="Small steps"
                      defaultValue={3.7}
                      getAriaValueText={valuetext}
                      step={0.5}
                      marks
                      min={-16}
                      max={+20}
                      valueLabelDisplay="auto"
                    />
                  </>
                </Box>

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
                  <Item>PPI</Item>

                  <>
                    <Slider
                      aria-label="Small steps"
                      defaultValue={3.7}
                      getAriaValueText={valuetext}
                      step={0.5}
                      marks
                      min={-16}
                      max={+20}
                      valueLabelDisplay="auto"
                    />
                  </>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<NightsStayIcon />}
                  onClick={postData}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {/* end right side of pred. page */}
      </Box>
    </Paper>
  );
};

export default Prediction;
