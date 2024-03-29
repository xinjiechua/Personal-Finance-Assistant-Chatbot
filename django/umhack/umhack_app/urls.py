from django.urls import path
from . import views

urlpatterns = [
    # path('chatbot', views.chatbotView, name='hello'),
    # path('chatbot', views.chatbot, name='chat_prompt'),
    path('test', views.test, name='test'),
    path('', views.welcome, name='welcome'),
    path('chatbot/send_message', views.send_message, name='send_message'),
    # expected data from frontend:
    #     method: 'POST',
    #     body:{
    #             "thread_id": "thread_2pW1ODo2IyUiX9tYpfsqlW79", (user value)
    #             "message": "Hi what is your name?" (user value)
    #         }
    path('chatbot/retrieve_message', views.retrieve_message, name='retrieve_message'),
    # expected data from frontend:
    #     method: 'GET',
    #     body:{
    #             "thread_id": "thread_2pW1ODo2IyUiX9tYpfsqlW79", (user value)
    #         }
]
