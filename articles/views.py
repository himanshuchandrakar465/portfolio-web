from django.shortcuts import render


def index(request):
    # return HttpResponse("Hello Django")
    return render(request, r"index.html")


def about(request):
    return render(request, "about.html")


def contact(request):
    return render(request, "contact.html")


def project(request):
    return render(request, "projects.html")
