from django.shortcuts import render
from django.http import HttpResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
@csrf_exempt
def test(request):
    # if request.method == "POST":
    #     try:
    #         # Call the initialize_new_query function to create a new query document
    #         query_id = initialize_new_query()

    #         # Return the query ID as a JSON response
    #         response_data = {"query_id": query_id}
    #         return JsonResponse(response_data)
    #     except Exception as e:
    #         return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"sucess": "this endpoint is localhost:8000/umhack_app/test"}, status=200)


@csrf_exempt
def welcome(request):
    return JsonResponse({"sucess": "Django Endpoint Hit!"}, status=200)