from django.shortcuts import render, redirect
from .models import Message


def index(request):
    # return HttpResponse("Hello Django")
    return render(request, r"index.html")


def about(request):
    return render(request, "about.html")


def contact(request):
    return render(request, "contact.html")


def projects(request):
    return render(request, "projects.html")


def contact(request):
    if request.method == "POST":
        Message.objects.create(
            name=request.POST["name"],
            email=request.POST["email"],
            subject=request.POST.get("subject", ""),
            message=request.POST["message"],
        )
        return redirect("contact")
    return render(request, "contact.html")
