import pandas as pd
import numpy as np
from sklearn.utils import resample

dataset = pd.read_csv ("dataset.csv")
dataset.columns = dataset.columns.str.strip()

def getDatasetsSplittedByYear (df:pd.DataFrame) -> dict:
    # Get unique values in the "year" column
    unique_years = df['year'].unique()

    # Create a list of datasets for each unique year
    datasets = {}

    for year in unique_years:
        # Create a new dataset for each unique year
        datasets[year] = df[df['year'] == year]

    return datasets

def upsampleDataset (df:pd.DataFrame, year:int, desired_samples = 100):
    #the other datas are fixed and doesn't make sense to resample on them, i will add them back after
    resamplableColumns = ['totalAssets', 'totalLiabilities', 'productionValue/ProfitBeforeTaxes', 'profitLoss', 'ReturnOnAssets', 'ReturnOnEquity', 'NetP&L/OperatingP&L']
    df = df[resamplableColumns]

    n_samples = df.shape[0]

    # Calculate the number of samples to generate through upsampling
    n_samples_to_generate = desired_samples - n_samples

    # Upsample the dataset to the desired size
    if n_samples_to_generate > 0:
        upsampled_data = resample(df, replace=True, n_samples=n_samples_to_generate, random_state=42)
        X_upsampled = np.vstack((df, upsampled_data))
    else:
        X_upsampled = df

    # Convert the NumPy array to a Pandas DataFrame
    X_upsampled_dataset = pd.DataFrame(X_upsampled, columns=df.columns)
    X_upsampled_dataset["year"] = year

    return X_upsampled_dataset

def mergeDatasets (splittedDatasets:dict):
    datasets = []
    for year, dataset in splittedDatasets.items():
        datasets.append (dataset)

    mergedDataset = pd.concat(datasets, axis=0)
    mergedDataset.reset_index(drop=True, inplace=True)

    return mergedDataset

def addBackAdditionalInfos (df):
    # Additional information
    additional_info = {
        "year": [2022, 2021, 2020],
        "GDP": [1897000000000, 2108000000000, 1909000000000],
        "GDP index": [-8.90, 8.3, 3.7],
        "unemploymentRate": [9.4, 9, 8.1],
        "PPI": [100.32, 111.15, 149.35],
        "exchangesRatesEuroDollar": [1.142203, 1.18318, 1.053783],
        "inflationRate": [0.14, 1.87, 8.2],
        "CPIindex": [102.73, 104.65, 113.18]
    }

    df_additional_info = pd.DataFrame(additional_info)

    return df.merge(df_additional_info, on="year", how="left")

splittedDatasets = getDatasetsSplittedByYear (dataset)
for year, dataset in splittedDatasets.items():
    splittedDatasets[year] = upsampleDataset (splittedDatasets[year], year)

rermergedDataset = mergeDatasets (splittedDatasets)

rermergedDatasetFull = addBackAdditionalInfos (rermergedDataset)

# Save the upsampled data to a CSV file
rermergedDatasetFull.to_csv("resampledDataset.csv", index=False)  # Set index to False to avoid writing row numbers