from sklearn.metrics import mean_squared_error
import numpy as np

mse = mean_squared_error(test, predictions)
rmse = np.sqrt(mse)
print(f"Root Mean Squared Error (RMSE): {rmse}")


#import matplotlib.pyplot as plt

#plt.plot(test, label='Actual')
##plt.plot(predictions, label='Predicted')
#plt.legend()
#plt.show()