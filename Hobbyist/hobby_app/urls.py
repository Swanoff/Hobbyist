from django.conf.urls import url
from hobby_app import views
app_name= 'hobby_app'

urlpatterns = [
        url(r'^home/$',views.register,name='home'),
        url(r'^login/$',views.user_login,name='login'),
        url(r'^logout/$',views.user_logout,name='logout'),
        url(r'^front/$',views.front,name='front'),
        url(r'^list/$',views.list_page,name='list'),
        url(r'^$',views.home,name='first'),
        url(r'^save/$',views.save,name='save'),
]
