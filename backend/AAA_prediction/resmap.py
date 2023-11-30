import pandas as pd
import numpy as np

# Assuming your original data is stored in the 'original_data' DataFrame
# ...
original_data = pd.read_csv('NetInflow.csv')

# Resample the original data to 300 rows
resampled_data = original_data.sample(n=300, replace=True, random_state=42)

# Concatenate the resampled data with the original data
final_data = pd.concat([original_data, resampled_data], ignore_index=True)

# Export the final dataset to a CSV file
final_data.to_csv('samp.csv', index=False)

# Display the first few rows of the final dataset
print(final_data.head())