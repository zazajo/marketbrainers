from django.shortcuts import render

def home(request):
    context = {
        'page_title': 'Home - Unified Marketing Engine',
    }
    return render(request, 'core/home.html', context)

def services(request):
    context = {
        'page_title': 'Services - Unified Catalog',
    }
    return render(request, 'core/services.html', context)

def packages(request):
    context = {
        'page_title': 'Packages - Campaign Solutions',
    }
    return render(request, 'core/packages.html', context)

def platforms(request):
    context = {
        'page_title': 'Platforms - Integration Inventory',
    }
    return render(request, 'core/platforms.html', context)

def case_studies(request):
    context = {
        'page_title': 'Case Studies - Proof of Work',
    }
    return render(request, 'core/case_studies.html', context)

def about(request):
    context = {
        'page_title': 'About Us - Company',
    }
    return render(request, 'core/about.html', context)

def contact(request):
    context = {
        'page_title': 'Contact - Campaign Intake',
    }
    return render(request, 'core/contact.html', context)

# Legal pages
def transparency(request):
    return render(request, 'core/legal/transparency.html')

def data_handling(request):
    return render(request, 'core/legal/data_handling.html')

def disclaimer(request):
    return render(request, 'core/legal/disclaimer.html')

def affiliations(request):
    return render(request, 'core/legal/affiliations.html')

def privacy(request):
    return render(request, 'core/legal/privacy.html')

def terms(request):
    return render(request, 'core/legal/terms.html')

def sitemap(request):
    return render(request, 'core/sitemap.html')