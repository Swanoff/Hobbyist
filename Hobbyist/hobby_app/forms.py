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
        #unique_together = ('username',)

    def clean_email(self):
        email = self.cleaned_data.get('email')
        username = self.cleaned_data.get('username')

        if email and User.objects.filter(email=email).exclude(username=username).exists():
            raise forms.ValidationError(u'Email must be unique')


        return email
