
from django.urls import path, include
from . import views
urlpatterns = [
   
	# path('',views.Main.as_view(),name="main"),
   path('<slug:id>/',views.Main.as_view(),name="main"),
   path('leaderboard/<slug:type>/',views.LeaderBoard.as_view(),name="leaderboard"),
   path('stats',views.Stats.as_view(),name="stats"),
   
]
