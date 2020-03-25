from django.shortcuts import render
from django.http import HttpResponse
import requests
import os

# Create your views here.


def home(request):
    return render(request, 'homepage.html', content_type=None)


def loadnote(request):
    filename = request.GET.get('filename')
    print(filename)
    with open("/home/tony/Downloads/techynotes/django/techynotes/mainscreen/mynotes/Golang-backend-server.html","r") as f:
        file_data = f.readlines()
        print(file_data)
    return HttpResponse(file_data)

def search_user(request):
    username = request.GET.get('username')
    url = "https://github.com/"+username
    status = ""
    try:
        check_user = requests.get(url)
        if(check_user.status_code == 200):
            status = "userexists"
        else:
            status = "usernotexists"
    except:
        status = "usernotexists"
    if(status == "userexists"):
        return HttpResponse("success")
    else:
        return HttpResponse("fail")

def save_file(request):
    filename = request.GET.get("filename")
    filename = filename+".html"
    file_data = request.GET.get("finalbody")
    path = os.path.join(os.path.abspath("."),"mainscreen","mynotes",filename)
    print(filename+"\n\n"+file_data)
    
    try:
        with open(path, "w") as f:
            f.write(file_data)
    except Exception as e:
        print(str(e))
        return HttpResponse("fail")
    else:
        return HttpResponse("success")