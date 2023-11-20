
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score, explained_variance_score, max_error
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import pickle
import os

from createPredictionModels import getModelsFolderPath

def getModelFromPickle (modelName):
    return pickle.load(os.path.join (getModelsFolderPath(), modelName + ".pickle"))

def checkFolderExists (path):
    if not os.path.exists(os.path.dirname (path)):
        os.makedirs (os.path.dirname (path))

def evaluate_model(model, model_name, X_test, y_test):
    predictions = model.predict(X_test)

    mse = mean_squared_error(y_test, predictions)
    mae = mean_absolute_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)
    explained_var = explained_variance_score(y_test, predictions)
    max_err = max_error(y_test, predictions)
    accuracy = accuracy_score(y_test, predictions.round())
    precision = precision_score(y_test, predictions.round())
    recall = recall_score(y_test, predictions.round())
    f1 = f1_score(y_test, predictions.round())
    
    # Confusion Matrix
    conf_matrix = confusion_matrix(y_test, predictions.round())

    filePath = os.path.join(getModelsFolderPath (), "evalutations", model_name + " evaluation.txt")
    checkFolderExists (filePath)
    with open (filePath, "w") as f:
        f.write(f"{model_name} - Mean Squared Error: {mse}\n")
        f.write(f"{model_name} - Mean Absolute Error: {mae}\n")
        f.write(f"{model_name} - R-squared: {r2}\n")
        f.write(f"{model_name} - Explained Variance Score: {explained_var}\n")
        f.write(f"{model_name} - Max Error: {max_err}\n")
        f.write(f"{model_name} - Accuracy: {accuracy}\n")
        f.write(f"{model_name} - Precision: {precision}\n")
        f.write(f"{model_name} - Recall: {recall}\n")
        f.write(f"{model_name} - F1 Score: {f1}\n")

        # Confusion Matrix
        f.write(f"{model_name} - Confusion Matrix:\n")
        for row in conf_matrix:
            f.write(" ".join(map(str, row)) + "\n")

    # Create a scatter plot of actual vs. predicted values
    plt.figure(figsize=(8, 6))
    sns.scatterplot(x=y_test, y=predictions)
    plt.title(f"{model_name} - Actual vs. Predicted")
    plt.xlabel("Actual Values")
    plt.ylabel("Predicted Values")
    plt.savefig (os.path.join(getModelsFolderPath (), "evalutations", model_name + " actual values vs predicted values plot.png"))

def evaulateModels ():
    modelsNames = [
        "linearRegModel",
        "ridgeModel",
        "lassoModel",
        "elasticNetModel",
        "decisionTreeModel"
    ]
    trainTestSplitObj = getModelFromPickle ("trainTestSplitObj")

    for modelName in modelsNames:
        evaluate_model (getModelFromPickle (modelName), modelName, trainTestSplitObj.get ("X_test"), trainTestSplitObj.get ("y_test"))