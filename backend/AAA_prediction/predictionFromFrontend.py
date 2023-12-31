
import numpy as np
import json
import os.path as path
import pandas as pd

from AAA_prediction.createPredictionModels import createPredictionModels
#from createPredictionModels import createPredictionModels
from AAA_prediction.evaluateModels import evaulateModels
#from evaluateModels import evaulateModels
from AAA_prediction.createPredictionModels import getModelFromPickle
#from createPredictionModels import getModelFromPickle
from AAA_prediction.getEvaluationValues import getEvaluationValues

#mockData usable to test the function
mockData = {
    #"Anno": "31/12/2023",
    #"Banca": "UniBank",
    # "Interessiattividaproventiassimilati": 15500,
    # "DiCuiInteressiAttiviCalcolatiConIlMetodoDellInteresseEffettivo": 12000,
    # "InteressiPassiviEOneriAssimilati": -5000,
    "MargineDiInteresse": 9000,
    # "CommissioniAttive": 7500,
    # "CommissioniPassive": -1200,
    "CommissioniNette": 6000,
    # "DividendiEProventiSimili": 400,
    # "RisultatoNettoDellattivitaDiNegoziazione": 800,
    # "RisultatoNettoDellattivitaDiCopertura": 350,
    # "Utili(perdite)DaCessioneORiacquistoDi": 400,
    # "AttivitaFinanziarieValutateAlCostoAmmortizzato": 120,
    # "AttivitaFinanziarieValutateAlFairValueConImpattoSullaRedditivitaComplessiva": 120,
    # "PassivitaFinanziarie": 180,
    # "RisultatoNettoDelleAltreAttivitaEPassivitaFinanziarieValutateAlFairValueConImpattoAContoEconomico": 500,
    # "AttivitaEPassivitaFinanziarieDesignateAlFairValue": 1000,
    # "AltreAttivitaFinanziarieObbligatoriamenteValutateAlFairValue": -550,
    "MargineDiIntermediazione": 18000,
    # "RettificheERipreseDiValoreNettePerRischioDiCreditoDi": -1900,
    # "AttivitaFinanziarieValutateAlCostoAmmortizzato2": 500,
    # "AttivitaFinanziarieValutateAlFairValueConImpattoSullaRedditivitaComplessiva2": 500,
    # "UtiliEPerditeDaModificheContrattualiSenzaCancellazioni": -1800,
    "RisultatoNettoDellaGestioneFinanziaria": -50,
    # "RisultatoNettoDellaGestioneFinanziariaEAssicurativa": -5,
    "SpeseAmministrative": 16000,
    # "SpesePerIlPersonale": 160.5,
    # "AltreSpeseAmministrative": -9500,
    # "AccantonamentiNettiAiFondiPerRischiEOneri": -5500,
    # "ImpegniEGaranzieRilasciate": -4000,
    # "AltriAccantonamentiNetti": 30,
    # "RettificheERipreseDiValoreNetteSuAttivitaMateriali": 40,
    # "RettificheERipreseDiValoreNetteSuAttivitaImmateriali": -10,
    # "AltriOnerERoventiDiGestione": -700,
    "CostiOperativi": -500,
    # "Utili(perdite)DellePartecipazioni": 550,
    # "Utili(perdite)DaCessioneDiInvestimenti": -10000,
    #"Utile(perdita)DellaOperativitaCorrenteAlLordoDelleImposte": 270,
    #"ImposteSulRedditoDellesercizioDelloperativitaCorrente": 30,
    #"Utile(perdita)DellaOperativitaCorrenteAlNettoDelleImposte": 7000,
    # "Utile(perdita)DiEsercizio": -800,
    # "PersonaleDipendente(valoreAssoluto)": 6200,
    "GDPIndex": 6200,
    "UnemploymentRate": 80000,
    "PPI": 3.2,
    "ExchangesRatesPercentage": 7.8,
    "CPIIndex": 24,
    "CovidStringencyIndex": 0.90,
    "RealInterestRate": 8.50,
    "CostPerEmployee": 20.99,
}

meanKeys = ['Interessiattividaproventiassimilati',
       'DiCuiInteressiAttiviCalcolatiConIlMetodoDellInteresseEffettivo',
       'InteressiPassiviEOneriAssimilati',
       'CommissioniAttive', 'CommissioniPassive', 
       'DividendiEProventiSimili', 'RisultatoNettoDellattivitaDiNegoziazione',
       'RisultatoNettoDellattivitaDiCopertura',
       'Utili(perdite)DaCessioneORiacquistoDi:',
       'AttivitaFinanziarieValutateAlCostoAmmortizzato',
       'AttivitaFinanziarieValutateAlFairValueConImpattoSullaRedditivitaComplessiva',
       'PassivitaFinanziarie',
       'RisultatoNettoDelleAltreAttivitaEPassivitaFinanziarieValutateAlFairValueConImpattoAContoEconomico',
       'AttivitaEPassivitaFinanziarieDesignateAlFairValue',
       'AltreAttivitaFinanziarieObbligatoriamenteValutateAlFairValue',
       'RettificheERipreseDiValoreNettePerRischioDiCreditoDi',
       'AttivitaFinanziarieValutateAlCostoAmmortizzato2',
       'AttivitaFinanziarieValutateAlFairValueConImpattoSullaRedditivitaComplessiva2',
       'UtiliEPerditeDaModificheContrattualiSenzaCancellazioni',
       'RisultatoNettoDellaGestioneFinanziariaEAssicurativa',
       'SpesePerIlPersonale',
       'AltreSpeseAmministrative', 'AccantonamentiNettiAiFondiPerRischiEOneri',
       'ImpegniEGaranzieRilasciate', 'AltriAccantonamentiNetti',
       'RettificheERipreseDiValoreNetteSuAttivitaMateriali',
       'RettificheERipreseDiValoreNetteSuAttivitaImmateriali',
       'AltriOnerERoventiDiGestione', 
       'Utili(perdite)DellePartecipazioni',
       'Utili(perdite)DaCessioneDiInvestimenti',
       'Utile(perdita)DellaOperativitaCorrenteAlLordoDelleImposte',
       'ImposteSulRedditoDellesercizioDelloperativitaCorrente',
       'Utile(perdita)DellaOperativitaCorrenteAlNettoDelleImposte',
       'Utile(perdita)DiEsercizio', 'PersonaleDipendente(valoreAssoluto)',
       ]

frontEndKeys = [
    'GDPIndex', 'UnemploymentRate',
    'PPI', 'ExchangesRatesPercentage',
    'CPIIndex', 'CovidStringencyIndex',
    'RealInterestRate', 'CostPerEmployee',
    'MargineDiInteresse', 'CommissioniNette',
    'MargineDiIntermediazione', 'RisultatoNettoDellaGestioneFinanziaria',
    'CostiOperativi', 'SpeseAmministrative'
]

mockTargetVariables= ["Utile(perdita)DellaOperativitaCorrenteAlLordoDelleImposte" , "Utile(perdita)DellaOperativitaCorrenteAlNettoDelleImposte"]

mockColumnsToRemove=["Anno", "Banca"]

def createDataToPredictOn (newValues:dict, dataset:pd.DataFrame):
    dictMeanValues = dataset[meanKeys].mean().to_dict()
    #dictMeanValues.update(newValues)
    newValuesDict = json.loads(newValues)
    dictMeanValues.update(newValuesDict)
    return dictMeanValues

def getPandasDataFrameFromAny(dataset:any)->pd.DataFrame:
    if (isinstance(dataset, str)):
        if path.exists(dataset):
            # Load your dataset (replace 'your_dataset.csv' with the actual filename)
            data = pd.read_csv(dataset)
        else: #this code is just for debugging in the "predictionFromFrontend.py" file instead of running the whole thing (fe/be)
            data = pd.read_csv(path.join(path.dirname(__file__),'newDataset.csv'))
    elif (isinstance(dataset, pd.DataFrame)):
        data = dataset
    else:
        raise ("The dataset given in input is neither a pd.Dataframe nor a string with a valid path")

    return data

def predictWithNewValues (newValues:str=json.dumps(mockData), targetVariables:list[str]=mockTargetVariables, columnsToRemove:list[str]=mockColumnsToRemove, dataset:any='./AAA_prediction/newDataset.csv')->str:
    
    #print(" new Vals - ", newValues)

 
    data = getPandasDataFrameFromAny (dataset)
    #print(" Data  Vals - ", data)
    newValues=createDataToPredictOn (newValues, data)

    models = createPredictionModels (
        target_variables=targetVariables,
        columnsToRemove=columnsToRemove,#non continuous ones,
        data=data,
    )

    evaulateModels (
        target_variables=targetVariables,
        columnsToRemove=columnsToRemove#non continuous ones
    )

    results = {}
    for modelName, model in models.items():
        #print(modelName)
        
        # Convert testData values to a numpy array and reshape
        dataToPredictOn = np.array(list(newValues.values())).reshape(1, -1)
        
        # Get the scaler from the pickle file
        scaler = getModelFromPickle("scaler", [], [])
        
        # Provide feature names to the scaler when transforming data
        dataToPredictOn_scaled = scaler.transform(dataToPredictOn)

        #print("Data to predict ", dataToPredictOn )

        forecast_result = model.predict(dataToPredictOn_scaled)
        forecast_values = forecast_result.flatten().tolist()
        results[modelName] = forecast_values
    
    return json.dumps(results)

def getDefaultValuesFrontEndVariable (dataset:any)->str:
    data = getPandasDataFrameFromAny (dataset)

    defaultValues = data[frontEndKeys].mean().to_dict()

    res = {}
    for key, value in defaultValues.items():
        res[key] = round (value, 2)

    return res

#Be sure to call this after calling predictWithNewValues
def getEvaluationValuesFrontend(targetVariables:list[str]=mockTargetVariables)->str:
    #return json.dumps(getEvaluationValues(targetVariables=targetVariables))
    return getEvaluationValues(targetVariables=targetVariables)

#print(getEvaluationValuesFrontend(["Utile(perdita)DellaOperativitaCorrenteAlLordoDelleImposte"]))