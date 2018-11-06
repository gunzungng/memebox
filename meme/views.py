from django.shortcuts import render

# Create your views here.
from meme.models import Lunbo, Productinfo


def HomePage(request):
    lunbos=Lunbo.objects.all()
    productinfos=Productinfo.objects.all()
    data={'lunbos':lunbos,
          'productinfos':productinfos

    }

    return render(request,'meme/HomePage.html',context=data
                  )


def login(request):
    if request.method=='GET':

        return render(request,'meme/login.html')
    elif request.method =='POST':
        pass


def register(request):
    if request.method=='GET':

        return render(request,'meme/register.html')
    elif request.method =='POST':
        pass
    return None