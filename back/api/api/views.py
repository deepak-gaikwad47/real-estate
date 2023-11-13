from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Estate
from .serializers import EstateSerializer
from .models import Estate
# Create your views here.
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.core import serializers

 

def getData(request):
    estates = Estate.objects.all()
    print('dataas',estates)
    return HttpResponse(serializers.serialize("json", Estate.objects.all()))


@csrf_exempt
def create(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        serializer = EstateSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)



def get_estate_details(request, id):
    try:
        estate = Estate.objects.get(pk=id)
        estate_data = {
            "title": estate.title,
            "address": estate.address,
            "transaction_type": estate.transaction_type,
            "reality_type": estate.reality_type,
            "publication_date": estate.publication_date.strftime('%Y-%m-%d')  # Formatting date if needed
            # Add other fields as needed
        }
        return JsonResponse(estate_data, status=200)
    except Estate.DoesNotExist:
        return JsonResponse({"error": "Estate not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)