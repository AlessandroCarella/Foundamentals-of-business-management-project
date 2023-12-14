import { useState } from "react";
import axios from "axios";

function usePredictors() {
  const [evaluation, setEvaluation] = useState({
    "linearRegModel Utile(perdita)DellaOperativitaCorrenteAlLordoDelleImposte Utile(perdita)DellaOperativitaCorrenteAlNettoDelleImposte evaluation.txt":
      {
        "Mean Squared Error": [553385.16786284, 1394170.8784025],
        "Mean Absolute Error": [610.18841935, 854.33078328],
        "R-squared": [0.93349213, 0.80988963],
        "Explained Variance Score": [0.93416984, 0.81104127],
        Accuracy: 0.6,
        Precision: 0.6,
        Recall: 0.6,
        "F1 Score": 0.6,
      },
  });

  const [values, setValues] = useState({
    MargineDiInteresse: 0,
    CommissioniNette: 0,
    MargineDiIntermediazione: 0,
    RisultatoNettoDellaGestioneFinanziaria: 0,
    CostiOperativi: 0,
    SpeseAmministrative: 0,
    GDPIndex: 0,
    PPI: 0,
    UnemploymentRate: 0,
    ExchangesRatesPercentage: 0,
    CPIIndex: 0,
    CovidStringencyIndex: 0,
    RealInterestRate: 0,
    CostPerEmployee: 0,
  });

  const fetchDataFromApi = async () => {
    try {
      const url = "http://127.0.0.1:8000/predict/";
      const data = {
        key2: [
          "Utile(perdita)DellaOperativitaCorrenteAlLordoDelleImposte",
          "Utile(perdita)DellaOperativitaCorrenteAlNettoDelleImposte",
        ],
        key3: ["Anno", "Banca"],
        key1: JSON.stringify(""),
        path: "./AAA_prediction/predictdata.csv",
      };
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          // Add any other headers if needed
        },
      });
      const apiResponse = response.data;

      //  const  { meanValues , evaluations, predictons  } = response.data

      //  modelname: {
      //     ppi : [{
      //       2021: 20,
      //       2022: 22
      //     }],

      //  }

      console.log(apiResponse);

      setValues({ ...values, ...apiResponse.meanValues });
      setEvaluation({ ...evaluation, ...apiResponse.evaluation });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return {
    evaluation,
    values,
    setValues,
    fetchDataFromApi,
  };
}

export default usePredictors;
