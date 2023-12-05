import re
import os.path as path
import json

from AAA_prediction.createPredictionModels import concatStrings
from AAA_prediction.utils import concatStrings, modelsNames

def read_metrics_file(file_path):
    metrics = {}

    with open(file_path, 'r') as file:
        content = file.read()

    # Extracting Mean Squared Error
    mse_match = re.search(r'Mean Squared Error: \[([\d. ]+)\]', content)
    if mse_match:
        metrics['Mean Squared Error'] = list(map(float, mse_match.group(1).split()))

    # Extracting Mean Absolute Error
    mae_match = re.search(r'Mean Absolute Error: \[([\d. ]+)\]', content)
    if mae_match:
        metrics['Mean Absolute Error'] = list(map(float, mae_match.group(1).split()))

    # Extracting R-squared
    r_squared_match = re.search(r'R-squared: \[([\d. ]+)\]', content)
    if r_squared_match:
        metrics['R-squared'] = list(map(float, r_squared_match.group(1).split()))

    # Extracting Explained Variance Score
    explained_variance_match = re.search(r'Explained Variance Score: \[([\d. ]+)\]', content)
    if explained_variance_match:
        metrics['Explained Variance Score'] = list(map(float, explained_variance_match.group(1).split()))

    # Extracting other metrics
    accuracy_match = re.search(r'Accuracy: ([\d.]+)', content)
    if accuracy_match:
        metrics['Accuracy'] = float(accuracy_match.group(1))

    precision_match = re.search(r'Precision: ([\d.]+)', content)
    if precision_match:
        metrics['Precision'] = float(precision_match.group(1))

    recall_match = re.search(r'Recall: ([\d.]+)', content)
    if recall_match:
        metrics['Recall'] = float(recall_match.group(1))

    f1_score_match = re.search(r'F1 Score: ([\d.]+)', content)
    if f1_score_match:
        metrics['F1 Score'] = float(f1_score_match.group(1))

    return metrics

def buildModelEvaluationPaths (targetVariables:list[str]):    
    modelEvaluationPaths = []
    for modelName in modelsNames:
        modelEvaluationPaths.append(path.join(path.dirname(__file__), "models", "evaluations", modelName + concatStrings(targetVariables) + " evaluation.txt"))
    return modelEvaluationPaths

def getEvaluationValues (targetVariables:list[str]):
    res = {}
    for modelEvaluationPath in buildModelEvaluationPaths (targetVariables=targetVariables):
        res[path.basename(modelEvaluationPath)] = read_metrics_file (modelEvaluationPath)
    return res
"""    
target_variables=[
    "Utile(perdita)DellaOperativitaCorrenteAlLordoDelleImposte", 
    "Utile(perdita)DellaOperativitaCorrenteAlNettoDelleImposte"
]

results = getEvaluationValues (targetVariables=target_variables)
for key, value in results.items():
    print (key)
    for key, subValue in value.items():
        print ("\t", key)
        print ("\t", subValue)"""

#print (json.dumps(results))