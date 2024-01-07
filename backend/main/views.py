from django.shortcuts import render
from authentification.models import Profile,User
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from authentification.serializers import ProfileSerializer
from .pagination import LeaderPagination
from .models import AddTime
from datetime import datetime, timedelta
from operator import itemgetter
class Main(APIView):
	# permission_classes = (IsAuthenticated, )
	def get(self,request,*args,**kwargs):
		id = kwargs.get('id',None)
		
		if id is not None:
			user =User.objects.get(personal_key=id)
			profile=Profile.objects.get(user=user)
			two_weeks_ago = datetime.now() - timedelta(days=14)
			last_two_weeks = AddTime.objects.filter(created_at__gte=two_weeks_ago,created_by=user)

			coding=0
			designing=0
			recording=0
			
			for obj in last_two_weeks:
				if obj.type == 'CODING':
					coding+=obj.amount
				if obj.type == 'DESIGN':
					designing+=obj.amount
				if obj.type == 'RECORD':
					recording+=obj.amount
			coding_hours=round(coding/60)
			designing_hours=round(designing/60)
			recording_hours=round(recording/60)
			data ={
					"code_mins":profile.code_hr_count,
		 			"code_hours":round(profile.code_hr_count/60),
					"design_mins":profile.design_hr_count,
					"design_hours":round(profile.design_hr_count/60),
					"record_mins":profile.recording_hr_count,
					"record_hours":round(profile.recording_hr_count/60),

					"coding_last_two_weeks":coding,
					"designing_last_two_weeks":designing,
					"recording_last_two_weeks":recording,
					
					"coding_hours_last_two_weeks":coding_hours,
					"designing_hours_last_two_weeks":designing_hours,
					"recording_hours_last_two_weeks":recording_hours
					}
			return Response(data)
		return Response({"message":"id is none"})	

				
	def post(self,request,*args,**kwargs):
		id = kwargs.get('id',None)
		
		minutes=request.data['minutes']
		type = request.data['type']
		
		print(type)
		if type =='figma':
			if minutes:
				user =User.objects.get(personal_key=id)
				profile =Profile.objects.get(user=user)
				profile.design_hr_count+=int(minutes)
				obj = AddTime()
				obj.amount =int(minutes)
				obj.created_by = user
				obj.type = 'DESIGN'
				obj.save()
				profile.save()
				return Response({"minutes":profile.design_hr_count,
								"hours":profile.design_hr_count/60})
		if type =='obs':
			if minutes:
				user =User.objects.get(personal_key=id)
				profile =Profile.objects.get(user=user)
				profile.recording_hr_count+=int(minutes)
				obj = AddTime()
				obj.amount =int(minutes)
				obj.created_by = user
				obj.type = 'RECORD'
				obj.save()
				profile.save()
				return Response({"minutes":profile.recording_hr_count,
								"hours":profile.recording_hr_count/60})
		if type =='code':
			user =User.objects.get(personal_key=id)
			profile =Profile.objects.get(user=user)
			profile.code_hr_count+=int(minutes)
			obj = AddTime()
			obj.amount =int(minutes)
			obj.created_by = user
			obj.type = 'CODING'
			obj.save()
			profile.save()
			return Response({"minutes":profile.code_hr_count,
							 "hours":profile.code_hr_count/60})
		return Response({"msg":"idk"})

class LeaderBoard(APIView):
	pagination_class = LeaderPagination
	def get(self,request,*args,**kwargs):
		type = kwargs.get('type',None)
		if type=='designers':
			profile =Profile.objects.order_by('-design_hr_count')
			serializer =ProfileSerializer(profile,many=True)
			return Response({"users":serializer.data})
		if type=='coders':
			profile =Profile.objects.order_by('-code_hr_count')
			serializer =ProfileSerializer(profile,many=True)
			return Response({"users":serializer.data})
		if type=='obs':
			profile =Profile.objects.order_by('-recording_hr_count')
			serializer =ProfileSerializer(profile,many=True)
			return Response({"users":serializer.data})
		if type=='two_weeks':
			two_weeks_ago = datetime.now() - timedelta(days=14)
			data=[]
			for user in User.objects.all()[:10]:
				lasttwoweeks = AddTime.objects.filter(created_at__gte=two_weeks_ago,created_by=user)
				sum = 0
				for add in lasttwoweeks:
					sum+=add.amount
				
				dict = {
					'user':user.username,
					'hours':sum
				}
				data.append(dict)
			sorted_list = sorted(data, key=itemgetter('hours'),reverse=True)
			
			return Response(sorted_list)
		return Response({"123":"123"})
	
class Stats(APIView):
	permission_classes = (IsAuthenticated, )
	def get(self,request,*args,**kwargs):
		user =request.user
		profile=Profile.objects.get(user=user)
		two_weeks_ago = datetime.now() - timedelta(days=14)
		last_two_weeks = AddTime.objects.filter(created_at__gte=two_weeks_ago)
		coding=0
		designing=0
		recording=0
		
		for obj in last_two_weeks:
			if obj.type == 'CODING':
				coding+=obj.amount
			if obj.type == 'DESIGN':
				designing+=obj.amount
			if obj.type == 'RECORD':
				recording+=obj.amount
		coding_hours=round(coding/60)
		designing_hours=round(designing/60)
		recording_hours=round(recording/60)

		data ={				"code_mins":profile.code_hr_count,
		 					"code_hours":round(profile.code_hr_count/60),
							"design_mins":profile.design_hr_count,
							"design_hours":round(profile.design_hr_count/60),
							"record_mins":profile.recording_hr_count,
							"record_hours":round(profile.recording_hr_count/60),
							"coding_last_two_weeks":coding,
							"designing_last_two_weeks":designing,
							"recording_last_two_weeks":recording,

							"coding_hours_last_two_weeks":coding_hours,
							"designing_hours_last_two_weeks":designing_hours,
							"recording_hours_last_two_weeks":recording_hours,}
		return Response(data)