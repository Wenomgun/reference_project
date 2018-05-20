from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, render_to_response
from django.template import RequestContext, loader

from .models import Banks
from .forms import BankForm


def index(request):
    print("++++++LOAD+++++")
    banks = Banks.objects.order_by('name')
    context = {'banks': banks}

    return render(request, 'mainApp/includes/referenceIndex.html', context)


def addbank(request):
    form = BankForm(request.POST or None)
    d = dict()

    bik = form.data.get("bik")
    name = form.data.get("name")
    cornumber = form.data.get("cornumber")
    adress = form.data.get("adress")

    b = Banks(bik=bik, name=name, cornumber=cornumber, adress=adress)
    b.save()

    banks = Banks.objects.all()
    print(banks)

    return JsonResponse(d)

def deletebank(request):
    print("+++++++DELETE++++++")
    d = dict()
    data = request.POST
    idCurBank = data.get("idBank")
    nameCurBank = data.get("nameBank")
    print(idCurBank + " " + nameCurBank + "idCurBank, nameCurBank")
    targetBank = Banks.objects.get(name=nameCurBank)
    targetBank.delete()
    return JsonResponse(d)

def updbank(request):
    print("+++++++UPDATE++++++")
    banks = Banks.objects.all()
    form = BankForm(request.POST or None)
    d = dict()
    data = request.POST
    idCurBank = data.get("idBank")
    nameCurBank = data.get("nameBank")
    print(idCurBank +" " + nameCurBank + "idCurBank, nameCurBank")

    bik = form.data.get("bik")
    name = form.data.get("name")
    cornumber = form.data.get("cornumber")
    adress = form.data.get("adress")

    targetBank = Banks.objects.get(name=nameCurBank)
    targetBank.bik = bik
    targetBank.name = name
    targetBank.cornumber = cornumber
    targetBank.adress = adress
    targetBank.save()

    return JsonResponse(d)

def searchbank(request):
    print("+++++++SEARCH++++++")
    banks = Banks.objects.all()
    d = dict()
    data = request.POST
    bikBankSearch = data.get("bikBankSearch")
    nameBankSearch = data.get("nameBankSearch")
    if bikBankSearch!="" and nameBankSearch!="":
        banks = Banks.objects.filter(name=nameBankSearch, bik=bikBankSearch)
    if bikBankSearch!="":
        banks = Banks.objects.filter(bik=bikBankSearch)
    if nameBankSearch!="":
        banks = Banks.objects.filter(name=nameBankSearch)
    print(banks)

    context = {'banks': banks}
    print("CONTEXT")
    print(banks)

    #return render_to_response("mainApp/includes/referenceIndex.html", context)
    return JsonResponse(data)