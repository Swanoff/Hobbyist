from django.shortcuts import render,redirect
from hobby_app.forms import UserForm
from django.contrib import auth
from django.http import HttpResponse , HttpResponseRedirect
from django.contrib.auth import authenticate,login,logout
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from hobby_app.models import ListContent,Title
from datetime import datetime
# Create your views here.
def index(request):
    formu = UserForm()
    form = {'form':formu}
    return render(request,'hobby_app/login.html',context=form)#Always use context=

def list_page(request):
    return render(request,'hobby_app/p2.html')

def register(request):
    registered = False

    if request.method =='POST':
        user_form = UserForm(data=request.POST)
        print("hi")
        if user_form.is_valid():
            user = user_form.save(commit = False)
            user.set_password(user.password)
            user.save()
            print("hi")
            registered = True

        else:
            print(user_form.errors)
    else:
        user_form = UserForm()
    #return redirect(index,{'form1':LoginForm,'form':user_form , 'registered':registered , 'errors':user_form.errors})
    return render(request,'hobby_app/login.html',context={'form':user_form , 'registered':registered , 'errors':user_form.errors})
def user_login(request):

    if request.method=='POST':
        email = request.POST.get('Email')
        password = request.POST.get('Password')
        print(password)
        try:
            u = User.objects.get(email = email)
        except:
            u = None
        if u:
            print(u.password)
            user = authenticate(username = u.username, password = password)
            print(user)
            if user:
                login(request,user)
                fo = UserForm()
                form = {'form':fo}
                request.session['uid'] = email #adding email to the session variable to send it to the home view
                return HttpResponseRedirect('/hobby_app/')
            else:
                return HttpResponse("Wrong pass")
        else:
            return HttpResponse("Wrong email")



    else:
        return render(request,'hobby_app/login.html',{})

#View for logging out user
@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/')
#This is the front page. Also used for logging out.
@login_required
def front(request):
    return render(request,'hobby_app/index.html',{})
@login_required
def home(request):
    email = request.session.get('uid')
    u = User.objects.get(email=email)
    print(u)
    title=[]
    list=[]
    title = Title.objects.filter(u_id=u).all()
    objs=[]



    name=[]
    for i in title:
        list = ListContent.objects.filter(lab_id = i).all()
        objs.append(list)
        name.append(i)
    list = zip(name,objs)
    return render(request,'hobby_app/p2.html',context={"list":list})
@login_required
@csrf_exempt
def save(request):
    flag = 1
    name = request.POST.get("name")
    id = request.POST.get("id")
    id = int(id)
    print(request.session)
    list = request.POST.getlist("list[]")#use getlist for getting lists.
                                        #JS passes the list objects with this kinda name only
    email = request.session.get('uid')
    u = User.objects.get(email=email) #fetching the user object whose session this is
    if(id<0):
        t = Title(title_name = name,u_id=u)
        t.save()
        flag= 0
    else:
        t = Title.objects.get(id=id)
        t.title_name = name
        t.save()
        l = ListContent.objects.filter(lab_id=t).all()
        if l is not None:
            for i in l:
                i.delete() #removing all existing ListContent objects
    if list is not None:
        for i in list:
            l = ListContent(lab_id=t,item_entry_name=i,remainder_date=datetime.now(),check_status=False)
            l.save()

    return HttpResponse(0)
