from django import forms
from .models import *

class BankForm(forms.ModelForm):
    class Meta:
        model = Banks
        exclude = ['']