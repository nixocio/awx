from django.conf.urls import url
from django.views.generic.base import TemplateView
from django.urls import re_path

class IndexView(TemplateView):

    template_name = 'index.html'


app_name = 'ui_next'

urlpatterns = [
    url(r'^next/$', IndexView.as_view(), name='ui_next'),
    # re_path('next', IndexView.as_view(), name='ui_next')
]
