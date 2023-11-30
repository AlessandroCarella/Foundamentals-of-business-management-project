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
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet
from sklearn.tree import DecisionTreeRegressor
import pickle
import os.path as path
import os

from AAA_prediction.utils import modelsNames, concatStrings, getModelsFolderPath, saveToPickleFile

def getModelFromPickle(modelName: str, target_variables: list[str], columns_to_remove: list[str]) -> any:
    modelPath = path.join(getModelsFolderPath(), modelName + concatStrings(target_variables) + ".pickle")

    if not path.exists(modelPath):
        createPredictionModels(target_variables=target_variables, columnsToRemove=columns_to_remove)

    with open(modelPath, 'rb') as file:
        return pickle.load(file)
    
def preprocess_data(X)->np.ndarray:
    scaler = StandardScaler()
    scaler.fit (X)
    saveToPickleFile (scaler, "scaler")
    X_normalized =  scaler.transform (X)
    return X_normalized

def getLinearRegressionModel (X_train:np.ndarray, y_train:np.ndarray)->LinearRegression:
    linear_reg_model = LinearRegression()
    linear_reg_model.fit(X_train, y_train)
    return linear_reg_model

def getRidgeModel (X_train:np.ndarray, y_train:np.ndarray)->Ridge:
    ridge_model = Ridge()
    ridge_model.fit(X_train, y_train)
    return ridge_model

def getLassoModel (X_train:np.ndarray, y_train:np.ndarray)->Lasso:
    lasso_model = Lasso()
    lasso_model.fit(X_train, y_train)
    return lasso_model

def getElasticNetModel (X_train:np.ndarray, y_train:np.ndarray)->ElasticNet:
    elastic_net_model = ElasticNet()
    elastic_net_model.fit(X_train, y_train)
    return elastic_net_model

def getDecisionTreeModel (X_train:np.ndarray, y_train:np.ndarray)->DecisionTreeRegressor:
    decision_tree_model = DecisionTreeRegressor()
    decision_tree_model.fit(X_train, y_train)
    return decision_tree_model

def readModels (target_variables:list[str], columnsToRemove:list[str])->dict:    
    models = {}
    for modelName in modelsNames:
        models[modelName] = getModelFromPickle (modelName, target_variables, columnsToRemove)
    
    return models

def createPredictionModels (target_variables:list[str], columnsToRemove:list[str], datasetPath:str='./AAA_prediction/newDataset.csv'):
      
    # Load your dataset (replace 'your_dataset.csv' with the actual filename)
    data = pd.read_csv(datasetPath)

    columnsToRemove.extend (target_variables)
    # Extract features and target variable
    X = data.drop(columns=columnsToRemove, axis=1)
    y = data[target_variables]

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
    saveToPickleFile (trainTestSplitObj, "trainTestSplitObj" + concatStrings (target_variables))

    linearRegModel = getLinearRegressionModel (X_train, y_train)
    saveToPickleFile (linearRegModel, "linearRegModel" + concatStrings (target_variables))
    
    ridgeModel = getRidgeModel (X_train, y_train)
    saveToPickleFile (ridgeModel, "ridgeModel" + concatStrings (target_variables))

    lassoModel = getLassoModel (X_train, y_train)
    saveToPickleFile (lassoModel, "lassoModel" + concatStrings (target_variables))
    
    elasticNetModel = getElasticNetModel (X_train, y_train)
    saveToPickleFile (elasticNetModel, "elasticNetModel" + concatStrings (target_variables))
    
    decisionTreeModel = getDecisionTreeModel (X_train, y_train)
    saveToPickleFile (decisionTreeModel, "decisionTreeModel" + concatStrings (target_variables))

    return readModels (target_variables=target_variables, columnsToRemove=columnsToRemove)
