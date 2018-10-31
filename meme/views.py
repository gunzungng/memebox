from django.shortcuts import render

# Create your views here.
def HomePage(request):
    return render(request,'meme/HomePage.html')


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