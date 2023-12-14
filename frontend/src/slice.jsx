import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sliders : [
        {
            name: "GDPIndex",
            defaultValue: 3,
            value: 7,
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
    ]
};


export const sliderSlice = createSlice( {
    name:"slider",
    initialState,
    reducers:{
        myMeans : (state, action) => {
            const newTodo = action.payload
            state.sliders = newTodo
        }
    }
})


export const { myMeans } = sliderSlice.actions

export default sliderSlice.reducer;