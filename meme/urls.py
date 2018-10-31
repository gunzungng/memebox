from django.conf.urls import url

from meme import views

urlpatterns = [
    url(r'^$',views.HomePage),
    url(r'^login/$',views.login),
    url(r'^register/$',views.register)

]