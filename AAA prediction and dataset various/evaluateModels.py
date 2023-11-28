import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score, explained_variance_score, max_error
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import pickle
import os
import numpy as np

from createPredictionModels import getModelsFolderPath, concatStrings, getModelFromPickle
from utils import checkFolderExists, modelsNames, getModelsFolderPath, concatStrings

def evaluate_model(model:any, model_name:str, X_test:np.ndarray, y_test:np.ndarray, targetVariables:list[str]):
    predictions = model.predict(X_test)

    if len(targetVariables)==1:
        # Set a threshold to convert regression to binary classification
        threshold = 0.5  # Adjust the threshold based on your problem

        # Convert predictions to binary labels
        binary_predictions = (predictions > threshold).astype(int)
        binary_y_test = (y_test > threshold).astype(int)

        mse = mean_squared_error(y_test, predictions)
        mae = mean_absolute_error(y_test, predictions)
        r2 = r2_score(y_test, predictions)
        explained_var = explained_variance_score(y_test, predictions)

        # Calculate classification metrics
        accuracy = accuracy_score(binary_y_test, binary_predictions)
        precision = precision_score(binary_y_test, binary_predictions)
        recall = recall_score(binary_y_test, binary_predictions)
        f1 = f1_score(binary_y_test, binary_predictions)
    else:
        # Calculate metrics for each output
        mse = mean_squared_error(y_test, predictions, multioutput='raw_values')
        mae = mean_absolute_error(y_test, predictions, multioutput='raw_values')
        r2 = r2_score(y_test, predictions, multioutput='raw_values')
        explained_var = explained_variance_score(y_test, predictions, multioutput='raw_values')
        #max_err = max_error(y_test, predictions)
        
        # For classification metrics, calculate for each class and then average
        accuracy = np.mean(np.equal(y_test.values.argmax(axis=1), predictions.argmax(axis=1)))
        precision = precision_score(y_test.values.argmax(axis=1), predictions.argmax(axis=1), average='micro')
        recall = recall_score(y_test.values.argmax(axis=1), predictions.argmax(axis=1), average='micro')
        f1 = f1_score(y_test.values.argmax(axis=1), predictions.argmax(axis=1), average='micro')

    
    # Confusion Matrix
    #conf_matrix = confusion_matrix(y_test.idxmax(axis=1).values, predictions.argmax(axis=1))

    filePath = os.path.join(getModelsFolderPath(), "evaluations", model_name + " evaluation.txt")
    checkFolderExists(filePath)
    
    with open(filePath, "w") as f:
        f.write(f"Mean Squared Error: {mse}\n")
        f.write(f"Mean Absolute Error: {mae}\n")
        f.write(f"R-squared: {r2}\n")
        f.write(f"Explained Variance Score: {explained_var}\n")
        #f.write(f"Max Error: {max_err}\n")
        f.write(f"Accuracy: {accuracy}\n")
        f.write(f"Precision: {precision}\n")
        f.write(f"Recall: {recall}\n")
        f.write(f"F1 Score: {f1}\n")
        
        # Confusion Matrix
        #f.write(f"Confusion Matrix:\n")
        #for row in conf_matrix:
        #    f.write(" ".join(map(str, row)) + "\n")

    # Create a scatter plot of actual vs. predicted values
    """plt.figure(figsize=(8, 6))
    sns.scatterplot(x=y_test.idxmax(axis=1), y=predictions.argmax(axis=1))

    plt.title(f"Actual vs. Predicted")
    plt.xlabel("Actual Values")
    plt.ylabel("Predicted Values")
    plt.savefig(os.path.join(getModelsFolderPath(), "evaluations", model_name + " actual values vs predicted values plot.png"))"""

def evaulateModels (target_variables:list[str], columnsToRemove:list[str]):
    trainTestSplitObj = getModelFromPickle ("trainTestSplitObj", target_variables, columnsToRemove)

    for modelName in modelsNames:
        evaluate_model (
            getModelFromPickle (modelName, target_variables, columnsToRemove), 
            modelName + concatStrings (target_variables), 
            trainTestSplitObj.get ("X_test"), 
            trainTestSplitObj.get ("y_test"),
            target_variables
        )