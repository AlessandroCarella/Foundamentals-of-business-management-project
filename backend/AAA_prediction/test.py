
import numpy as np

#31/12/2023,UniBank,15500,12000,-5000,9000,7500,-1200,6000,400,800,350,400,120,120,180,500,1000,-550,18000,-1900,-1800,-50,-5,16000,160.5,-9500,-5500,-4000,30,40,-10,-700,-500,550,-10000,270,30,7000,-800, 6200,6200,80000,3.2,7.8,24,0.90,8.50,20.99,-0.30,-0.071
testData = {
    #"Anno": "31/12/2023",
    #"Banca": "UniBank",
    "Interessiattividaproventiassimilati": 15500,
    "DiCuiInteressiAttiviCalcolatiConIlMetodoDellInteresseEffettivo": 12000,
    "InteressiPassiviEOneriAssimilati": -5000,
    "MargineDiInteresse": 9000,
    "CommissioniAttive": 7500,
    "CommissioniPassive": -1200,
    "CommissioniNette": 6000,
    "DividendiEProventiSimili": 400,
    "RisultatoNettoDellattivitaDiNegoziazione": 800,
    "RisultatoNettoDellattivitaDiCopertura": 350,
    "Utili(perdite)DaCessioneORiacquistoDi": 400,
    "AttivitaFinanziarieValutateAlCostoAmmortizzato": 120,
    "AttivitaFinanziarieValutateAlFairValueConImpattoSullaRedditivitaComplessiva": 120,
    "PassivitaFinanziarie": 180,
    "RisultatoNettoDelleAltreAttivitaEPassivitaFinanziarieValutateAlFairValueConImpattoAContoEconomico": 500,
    "AttivitaEPassivitaFinanziarieDesignateAlFairValue": 1000,
    "AltreAttivitaFinanziarieObbligatoriamenteValutateAlFairValue": -550,
    "MargineDiIntermediazione": 18000,
    "RettificheERipreseDiValoreNettePerRischioDiCreditoDi": -1900,
    "AttivitaFinanziarieValutateAlCostoAmmortizzato2": 500,
    "AttivitaFinanziarieValutateAlFairValueConImpattoSullaRedditivitaComplessiva2": 500,
    "UtiliEPerditeDaModificheContrattualiSenzaCancellazioni": -1800,
    "RisultatoNettoDellaGestioneFinanziaria": -50,
    "RisultatoNettoDellaGestioneFinanziariaEAssicurativa": -5,
    "SpeseAmministrative": 16000,
    "SpesePerIlPersonale": 160.5,
    "AltreSpeseAmministrative": -9500,
    "AccantonamentiNettiAiFondiPerRischiEOneri": -5500,
    "ImpegniEGaranzieRilasciate": -4000,
    "AltriAccantonamentiNetti": 30,
    "RettificheERipreseDiValoreNetteSuAttivitaMateriali": 40,
    "RettificheERipreseDiValoreNetteSuAttivitaImmateriali": -10,
    "AltriOnerERoventiDiGestione": -700,
    "CostiOperativi": -500,
    "Utili(perdite)DellePartecipazioni": 550,
    "Utili(perdite)DaCessioneDiInvestimenti": -10000,
    #"Utile(perdita)DellaOperativitaCorrenteAlLordoDelleImposte": 270,
    "ImposteSulRedditoDellesercizioDelloperativitaCorrente": 30,
    #"Utile(perdita)DellaOperativitaCorrenteAlNettoDelleImposte": 7000,
    "Utile(perdita)DiEsercizio": -800,
    "PersonaleDipendente(valoreAssoluto)": 6200,
    "GDPIndex": 6200,
    "UnemploymentRate": 80000,
    "PPI": 3.2,
    "ExchangesRatesPercentage": 7.8,
    "CPIIndex": 24,
    "CovidStringencyIndex": 0.90,
    "RealInterestRate": 8.50,
    "CostPerEmployee": 20.99,
}


#targetVariables=["Utile(perdita)DellaOperativitaCorrenteAlLordoDelleImposte", "Utile(perdita)DellaOperativitaCorrenteAlNettoDelleImposte"], columnsToRemove=["Anno", "Banca"]

targetVariables= ["Utile(perdita)DellaOperativitaCorrenteAlLordoDelleImposte" , "Utile(perdita)DellaOperativitaCorrenteAlNettoDelleImposte"]


columnsToRemove = ["Anno", "Banca"]
def test ( targetVariables, columnsToRemove ):
    from AAA_prediction.createPredictionModels import createPredictionModels
    models = createPredictionModels (
        target_variables=targetVariables,
        columnsToRemove=columnsToRemove#non continuous ones
    )

    from AAA_prediction.evaluateModels import evaulateModels
    evaulateModels (
        target_variables=targetVariables,
        columnsToRemove=columnsToRemove#non continuous ones
    )

    from AAA_prediction.createPredictionModels import getModelFromPickle
    for modelName, model in models.items():
        #print(modelName)
        
        # Convert testData values to a numpy array and reshape
        dataToPredictOn = np.array(list(testData.values())).reshape(1, -1)
        
        # Get the scaler from the pickle file
        scaler = getModelFromPickle("scaler", [], [])
        
        # Provide feature names to the scaler when transforming data
        dataToPredictOn_scaled = scaler.transform(dataToPredictOn)

        #print("Data to predict ", dataToPredictOn )

        forecast_result = model.predict(dataToPredictOn_scaled)
        forecast_values = forecast_result.flatten().tolist()
        print("Results: ",forecast_values)
        return forecast_values
        #print(type(model.predict(dataToPredictOn_scaled)))

test(targetVariables, columnsToRemove)