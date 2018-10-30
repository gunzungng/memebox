from django.conf.urls import url

from meme import views

urlpatterns = [
    url(r'^$',views.HomePage)


]