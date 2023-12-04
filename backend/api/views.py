from rest_framework.response import Response
from rest_framework.decorators import api_view
# from AAA_prediction  import test
# from AAA_prediction  import createPredictionModels
# from AAA_prediction  import utils

from AAA_prediction.predictionFromFrontend import predictWithNewValues

# Create your views here.

@api_view(['GET'])
def getData(request):
    person = { 'name': "Mark","age": 24}
    return Response(person)

@api_view(['POST'])
def predict(request):
    
    print(request.data)

    target = request.data

    #print(target.get('key1'))
    param1 = target.get('key1')
    param2 = target.get('key2')
    param3 = target.get('key3')
    param4 = target.get('path')

    print("1 -",param1, " 2: ",param2)

    print("3 -: ",param3, " 4  -: ",param4)

    #get the parameter
    #pass the params to the model
    #return the model results to the frontend
    #results =  predictWithNewValues(param1, param2, param3,param4)
    #return Response({"data": results})