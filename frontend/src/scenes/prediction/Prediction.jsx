import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Button, Typography, CircularProgress, Paper } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import ParamSliders from "../../component/ParamSliders";
import Papa from "papaparse";
import Inputs from "../../component/Inputs";
import image from "../../assets/barber.svg";
import image1 from "../../assets/data.svg";
import usePredictors from "../../hooks/usePredictors";
import { useNavigate } from "react-router-dom";

const sliderItems = [
  {
    name: "GDPIndex",
    defaultValue: 2,
    value: 2,
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
    max: 100,
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
  {
    id: "11",
    name: "MargineDiInteresse",
    defaultValue: 0,
    type: "text",
    label: "MargineDiInteresse",
  },
  {
    id: "12",
    name: "CommissioniNette",
    defaultValue: 0,
    type: "text",
    label: "CommissioniNette",
  },
  {
    id: "13",
    name: "MargineDiIntermediazione",
    defaultValue: 0,
    type: "text",
    label: "MargineDiIntermediazione",
  },
  {
    id: "14",
    name: "RisultatoNettoDellaGestioneFinanziaria",
    defaultValue: 0,
    type: "text",
    label: "RisultatoNettoDellaGestioneFinanziaria",
  },
  {
    id: "15",
    name: "CostiOperativi",
    defaultValue: 0,
    type: "text",
    label: "CostiOperativi",
  },
  {
    id: "16",
    name: "SpeseAmministrative",
    defaultValue: 0,
    type: "text",
    label: "SpeseAmministrative",
  },
];

const Prediction = () => {
  const { values, setValues, fetchDataFromApi } = usePredictors();

  const [hideSliders, setHideSlider] = useState(true);

  

  useEffect(() => {
    console.log("Slider was updated - ", sliderItems);
    console.log("Values was updated - ", values);
  }, [sliderItems, values]);

  const handleTextChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log("Here are the values of Inputs ", values);
  };

  const postData = async () => {
    // Call the function to fetch data from the API
    await fetchDataFromApi();

    // Other logic related to postData if needed
  };

  const handleChange = (e) => {
    //console.log(e, i, activeThumb);
    setValues({ ...values, [e.target.name]: e.target.value });
    //console.log("slider values  ", values);
  };

  const navigate = useNavigate();


  const send2evaluation = () => {
    // Change the path as needed
    navigate('/evaluations');
  };

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

          //setting prediction as the uploaded csv ... NB-- not necessary
          //setPrediction(result.data);
          postData();
        },
        header: true, // Set to true if your CSV has headers
      });
    }

    // Perform your file upload logic here

    // For demonstration purposes, simulate a delay with setTimeout
    /// show the predictiors
    setHideSlider(false)
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
              Upload a Dataset to use prediction parameters
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
            display={hideSliders ? "none" : "flex-col"}
            alignItems={"center"}
            alignContent={"center"}
            justifyContent={"center"}
            mt={10}
          >
            <div>
              {sliderItems.slice(8, 11).map((input) => {
                return (
                  <Inputs
                    key={input.id}
                    inputName={input.name}
                    value={values[input.name]}
                    handleTextChange={handleTextChange}
                  />
                );
              })}
            </div>

            <div>
              {sliderItems.slice(11, 14).map((input) => {
                return (
                  <Inputs
                    key={input.id}
                    inputName={input.name}
                    value={values[input.name]}
                    handleTextChange={handleTextChange}
                  />
                );
              })}
            </div>
          </Box>
          <Box
            display={hideSliders ? " none" : "flex"}
            alignContent={"center"}
            justifyContent={"center"}
            mx={"10px"}
          >
            <Button
              fullWidth="true"
              variant="contained"
              color="primary"
              component="span"
              startIcon={<NextPlanIcon />}
              onClick={send2evaluation}
            >
              Start Forecasting 
            </Button>
          </Box>
        </Box>

        {/* end left side of pred. page - Import */}

        {/* right side of pred. page */}
        {!hideSliders ? (
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
              display={hideSliders ? "none" : "flex"}
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
                {sliderItems.slice(0, 4).map((item, index) => (
                  <ParamSliders
                    key={index}
                    name={item.name}
                    defaultValue={values[item.name]}
                    value={values[item.name]}
                    step={item.step}
                    min={item.min}
                    max={item.max}
                    handleChange={handleChange}
                  />
                ))}

                {/* <Button
                  variant="contained"
                  color="secondary"
                  component="span"
                  startIcon={<NightsStayIcon />}
                  onClick={fetchData}
                >
                  Get
                </Button> */}
              </Box>

              <Box
                display={"flex"}
                flexDirection={"column"}
                alignContent={"center"}
                width="100%"
                height="100%"
              >
                {sliderItems.slice(4, 8).map((item, index) => (
                  <ParamSliders
                    key={index}
                    name={item.name}
                    defaultValue={values[item.name]}
                    value={values[item.name]}
                    step={item.step}
                    min={item.min}
                    max={item.max}
                    handleChange={handleChange}
                  />
                ))}

                {/* <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<NightsStayIcon />}
                  onClick={postData}
                >
                  Post
                </Button> */}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignContent={"center"}
            alignItems={"center"}
          >
            {/* <Typography component="div">
              <Box sx={{ fontWeight: "bold", font:"caption", m: 1 }}>
                Upload a Dataset to use prediction parameters
              </Box>
            </Typography> */}

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
                <img
                  src={image1}
                  alt=""
                  width={"200px"}
                  height={"500px"}
                  style={{ width: "400px" }}
                />
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
