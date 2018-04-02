from django.conf.urls import url
from hobby_app import views
app_name= 'hobby_app'

urlpatterns = [
        url(r'^home/$',views.register,name='home'),
        url(r'^login/$',views.user_login,name='login'),
]
