from rest_framework import serializers
from .models import User,Profile
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields =['id','username','password','personal_key']
		extra_kwargs = {
			'password':{'write_only':True}
		}

	def create(self,validated_data):
		password = validated_data.pop('password',None)
		instance =  self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()
		return instance
	
class ProfileSerializer(serializers.ModelSerializer):
	user = serializers.SerializerMethodField()
	class Meta:
		model=Profile
		fields = ['user','code_hr_count','design_hr_count','recording_hr_count']
	def get_user(self,obj):
		return obj.user.username
	#Миша допиши здесь сериализер пользователя