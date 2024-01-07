from django.db import models
from django.contrib.auth.models import AbstractUser,AbstractBaseUser
from django.utils.translation import gettext_lazy as _
from random import randint
from django.db.models.signals import post_save
# Create your models here.
def generate_personal_id():
    # Implement your logic to generate a unique personal ID here
    # For example, you can use the uuid module or any other method
    return randint(1000000,1000000000)
class User(AbstractUser):
	username = models.CharField(max_length=255,unique=True)
	email = models.CharField(max_length=255)
	password = models.CharField(max_length=255)
	personal_key= models.CharField(_("personal_id"), max_length=10, unique=True, blank=True, null=True)

	def save(self, *args, **kwargs):
        # Generate the personal ID if not provided
			if not self.personal_key:
				self.personal_key = generate_personal_id()
			super().save(*args, **kwargs)
    
	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = []

class Profile(models.Model):
	user = models.OneToOneField(User,on_delete=models.CASCADE)
	bio = models.CharField(max_length=1000,blank=True)
	code_hr_count =models.PositiveIntegerField(default=0)
	design_hr_count =models.PositiveIntegerField(default=0)
	recording_hr_count =models.PositiveIntegerField(default=0)
	def __str__(self) -> str:
		return str(self.user)+"|"+str(self.id)
	
	def create_user_profile(sender,instance,created,**kwargs):
		if created:
			Profile.objects.create(user=instance)
	def save_user_profile(sender,instance,**kwargs):
		instance.profile.save()
	
	post_save.connect(create_user_profile,sender=User)
	post_save.connect(save_user_profile,sender=User)
