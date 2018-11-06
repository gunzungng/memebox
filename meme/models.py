from django.db import models

# Create your models here
class Lunbo(models.Model):
    img=models.CharField(max_length=100)



class Productinfo(models.Model):
    type=models.CharField(max_length=10)
    brand=models.CharField(max_length=50)
    name=models.CharField(max_length=50)
    op=models.IntegerField()
    np=models.IntegerField()
    img=models.CharField(max_length=100)
    infoimg=models.CharField(max_length=100)