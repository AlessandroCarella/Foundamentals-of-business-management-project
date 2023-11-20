import pandas as pd
import pickle
from os.path import join, isfile, abspath, dirname
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

def getXtrainYTrainXtestYTest():
    # Load the dataset
    df = pd.read_csv("resampledDataset.csv")

    # Split the dataset into features and target variable
    y = df["totalAssets"]
    X = df.drop(["totalAssets"], axis=1)

    # Split the dataset into training and testing sets
    Xtrain, Xtest, yTrain, yTest = train_test_split(X, y, test_size=0.2, random_state=69)

    return Xtrain, yTrain, Xtest, yTest

def getKnnClassifier():
    filePathKnnClassifier = join(dirname(abspath(__file__)), "serializedObjects/KnnClassifier.pickle")

    if isfile(filePathKnnClassifier):
        with open(filePathKnnClassifier, "rb") as f:
            KnnClassifier = pickle.load(f)
    else:
        nNeib = 1
        print("Creazione Knn classifier")
        KnnClassifier = KNeighborsClassifier(n_neighbors=nNeib)
        Xtrain, yTrain, Xtest, yTest = getXtrainYTrainXtestYTest()
        KnnClassifier.fit(Xtrain, yTrain)

        with open(filePathKnnClassifier, "wb") as f:
            pickle.dump(KnnClassifier, f)

    return KnnClassifier

"""def getNaiveBayesClassifier():
    filePathNaiveBayesClassifier = join(dirname(abspath(__file__)), "serializedObjects/naiveBayesClassifier.pickle")

    if isfile(filePathNaiveBayesClassifier):
        with open(filePathNaiveBayesClassifier, "rb") as f:
            naiveBayesClassifier = pickle.load(f)
    else:
        print("Creazione Naive Bayes classifier")
        naiveBayesClassifier = MultinomialNB(alpha=3, force_alpha=True, fit_prior=True)
        Xtrain, yTrain, Xtest, yTest = getXtrainYTrainXtestYTest()
        naiveBayesClassifier.fit(Xtrain, yTrain)

        with open(filePathNaiveBayesClassifier, "wb") as f:
            pickle.dump(naiveBayesClassifier, f)

    return naiveBayesClassifier"""

def getRandomForestClassifier():
    filePathRandomForestClassifier = join(dirname(abspath(__file__)), "serializedObjects/randomForestClassifier.pickle")

    if isfile(filePathRandomForestClassifier):
        with open(filePathRandomForestClassifier, "rb") as f:
            randomForestClassifier = pickle.load(f)
    else:
        print("Creazione random forest classifier")
        randomForestClassifier = RandomForestClassifier(n_estimators=100, verbose=True, random_state=69)
        Xtrain, yTrain, Xtest, yTest = getXtrainYTrainXtestYTest()
        randomForestClassifier.fit(Xtrain, yTrain)

        with open(filePathRandomForestClassifier, "wb") as f:
            pickle.dump(randomForestClassifier, f)

    return randomForestClassifier

def getSVMClassifier():
    filePathSVMClassifier = join(dirname(abspath(__file__)), "serializedObjects/SVMClassifier.pickle")

    if isfile(filePathSVMClassifier):
        with open(filePathSVMClassifier, "rb") as f:
            SVMClassifier = pickle.load(f)
    else:
        SVMClassifier = SVC(kernel='linear', random_state=69, probability=True)

        Xtrain, yTrain, Xtest, yTest = getXtrainYTrainXtestYTest()
        SVMClassifier.fit(Xtrain, yTrain)

        with open(filePathSVMClassifier, "wb") as f:
            pickle.dump(SVMClassifier, f)

    return SVMClassifier

knn = getKnnClassifier ()
#naiveBayes =getNaiveBayesClassifier ()
randomForestClass = getRandomForestClassifier ()
#getSVMClassifier ()