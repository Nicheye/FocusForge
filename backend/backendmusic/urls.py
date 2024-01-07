
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from authentification.views import urls
urlpatterns = [
    path('admin/', admin.site.urls),
	path('token/', 
          jwt_views.TokenObtainPairView.as_view(), 
          name ='token_obtain_pair'),
     path('token/refresh/', 
          jwt_views.TokenRefreshView.as_view(), 
          name ='token_refresh'),
		  
	path('',urls,name="views"),
	path('api/v1/',include("authentification.urls")),
	path('api/v1/main/',include("main.urls")),
	
    
]
