import pandas as pd
import statsmodels.api as sm

from sklearn.metrics import mean_squared_error
import numpy as np

# Load your dataset (replace 'your_dataset.csv' with your actual dataset)
df = pd.read_csv('samp.csv')

# Assuming your dataset has a timestamp column (replace 'timestamp' with your actual timestamp column)
df['year'] = pd.to_datetime(df['year'])
df.set_index('year', inplace=True)


# Assuming 'Net Inflow' is the column you want to forecast
y = df['Net Inflow']


train_size = int(len(y) * 0.8)
train, test = y[:train_size], y[train_size:]


# ARIMA model (p, d, q) parameters are placeholders and need to be tuned
model = sm.tsa.ARIMA(train, order=(1, 1, 1))
results = model.fit()


predictions = results.predict(start=len(train), end=len(train) + len(test) - 1, dynamic=False)




mse = mean_squared_error(test, predictions)
rmse = np.sqrt(mse)
print(f"Root Mean Squared Error (RMSE): {rmse}")



