from django import forms
from hobby_app.models import Title,ListContent
from django.contrib.auth.models import User
from django.core import validators

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    email = forms.EmailField(validators = [validators.validate_email])
    class Meta():
        model = User
        fields = ('username','email','password')
