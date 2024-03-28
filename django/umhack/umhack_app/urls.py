from django.urls import path
from . import views

urlpatterns = [
    # path('chatbot', views.chatbotView, name='hello'),
    # path('chatbot', views.chatbot, name='chat_prompt'),
    path('test', views.test, name='test'),
    path('', views.welcome, name='welcome'),
]
