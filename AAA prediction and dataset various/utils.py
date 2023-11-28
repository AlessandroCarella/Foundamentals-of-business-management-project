
import os.path as path
import os
import pickle


modelsNames = [
        "linearRegModel",
        "ridgeModel",
        "lassoModel",
        "elasticNetModel",
        "decisionTreeModel"
    ]

def checkFolderExists (folderPath:str):
    if not path.exists(path.dirname (folderPath)):
        os.makedirs (path.dirname (folderPath))

def getModelsFolderPath ()->str:
    return path.join(path.dirname(__file__), 'models')

def saveToPickleFile(obj: any, modelName: str):
    if not path.exists(getModelsFolderPath()):
        os.makedirs(getModelsFolderPath())
    with open(path.join(getModelsFolderPath(), modelName + ".pickle"), 'wb') as file:
        pickle.dump(obj, file)

def concatStrings (stringsList:list[str]) -> str:
    if len (stringsList) == 1:
        return stringsList[0]
    elif len (stringsList) == 0:
        return ""
    
    out = " "#the space is not a typo, just that the files names look better with it
    for string in stringsList:
        out += string + " "
    return out[:out.rfind(' ')] + out[out.rfind(' ')+1:] if ' ' in out else out #remove the last space