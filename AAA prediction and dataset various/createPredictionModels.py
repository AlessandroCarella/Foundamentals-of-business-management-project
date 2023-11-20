"""
IMPORTANT:
As highlighted by chat gpt in the reported chat, since we have a small dataset it would be better
to implement different kind of prediction models.
The plan is to have a large dataset in an actual implementation but i think it will never be big to
the point where there are more than ~500 data points so i still think a better implementation is
with the proposed regression models

YOU:
give me the top 5 regression models for small datasets

2 / 2

ChatGPT
When working with small datasets, it's essential to choose regression models that are less prone to overfitting and can handle the limited amount of data effectively. Here are five regression models that are suitable for small datasets:

Linear Regression:

Advantages: Simple, interpretable, and tends to work well when the relationship between the features and the target variable is approximately linear.
Considerations: May not perform well if the relationship is highly non-linear or if there are complex interactions between features.
Ridge Regression (L2 Regularization):

Advantages: Helps prevent overfitting by adding a regularization term to the linear regression cost function, which penalizes large coefficients.
Considerations: Suitable when there is multicollinearity among the features, and it can provide more stable results than standard linear regression.
Lasso Regression (L1 Regularization):

Advantages: Similar to Ridge Regression but uses L1 regularization, which can lead to sparse coefficient estimates (some coefficients become exactly zero), effectively performing feature selection.
Considerations: Useful when there are many irrelevant or redundant features, as it tends to select a subset of the most important features.
Elastic Net Regression:

Advantages: Combines L1 and L2 regularization, providing a balance between Ridge and Lasso regression. It can handle both multicollinearity and feature selection.
Considerations: Suitable when there are many features with varying degrees of importance.
Decision Tree Regression:

Advantages: Non-linear model that can capture complex relationships in the data. Robust to outliers and requires little data preprocessing.
Considerations: Prone to overfitting, so it's important to control its depth or use ensemble methods like Random Forest or Gradient Boosting to improve generalization.
It's crucial to note that the effectiveness of these models can vary depending on the specific characteristics of your dataset. In practice, it's often beneficial to try multiple models and compare their performance using cross-validation techniques to select the most suitable one for your specific case.
"""

# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet
from sklearn.tree import DecisionTreeRegressor
import pickle
import os

def getModelsFolderPath ():
    return os.path.join(os.path.dirname(__file__), 'models')

def getModelFromPickle (modelName):
    return pickle.load(os.path.join (getModelsFolderPath(), modelName + ".pickle"))

def saveToPickleFile (obj, modelName):
    pickle.dump (obj, os.path.join (getModelsFolderPath(), modelName + ".pickle"))


def getLinearRegressionModel (X_train, y_train):
    linear_reg_model = LinearRegression()
    linear_reg_model.fit(X_train, y_train)
    return linear_reg_model

def getRidgeModel (X_train, y_train):
    ridge_model = Ridge()
    ridge_model.fit(X_train, y_train)
    return ridge_model

def getLassoModel (X_train, y_train):
    lasso_model = Lasso()
    lasso_model.fit(X_train, y_train)
    return lasso_model

def getElasticNetModel (X_train, y_train):
    elastic_net_model = ElasticNet()
    elastic_net_model.fit(X_train, y_train)
    return elastic_net_model

def getDecisionTreeModel (X_train, y_train):
    decision_tree_model = DecisionTreeRegressor()
    decision_tree_model.fit(X_train, y_train)
    return decision_tree_model

def preprocess_data(X):
    scaler = StandardScaler()
    X_normalized = scaler.fit_transform(X)
    return X_normalized

# Call the main method when the script is run
if __name__ == "__main__":
    # Load your dataset (replace 'your_dataset.csv' with the actual filename)
    data = pd.read_csv('your_dataset.csv')

    # Assuming 'target_variable' is the name of your target variable
    target_variable = 'target_variable'

    # Extract features and target variable
    X = data.drop(columns=[target_variable])
    y = data[target_variable]

    # Optional: Data preprocessing (e.g., normalization)
    X = preprocess_data(X)

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    trainTestSplitObj = {
        "X_train": X_train,
        "X_test": X_test,
        "y_train": y_train,
        "y_test": y_test
    }
    saveToPickleFile (trainTestSplitObj, "trainTestSplitObj")

    linearRegModel = getLinearRegressionModel (X_train, y_train)
    saveToPickleFile (linearRegModel, "linearRegModel")
    
    ridgeModel = getRidgeModel (X_train, y_train)
    saveToPickleFile (ridgeModel, "ridgeModel")

    lassoModel = getLassoModel (X_train, y_train)
    saveToPickleFile (lassoModel, "lassoModel")
    
    elasticNetModel = getElasticNetModel (X_train, y_train)
    saveToPickleFile (elasticNetModel, "elasticNetModel")
    
    decisionTreeModel = getDecisionTreeModel (X_train, y_train)
    saveToPickleFile (decisionTreeModel, "decisionTreeModel")