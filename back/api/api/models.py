
from django.db import models

class Estate(models.Model):
    title = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    transaction_type = models.CharField(max_length=50)
    reality_type = models.CharField(max_length=50)
    publication_date = models.DateField()
