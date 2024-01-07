from django.db import models
from authentification.models import User
# Create your models here.
class AddTime(models.Model):
	RECORD = 'RECORD'
	DESIGN = 'DESIGN'
	CODING='CODING'
	WORK_OPTIONS = [
		(RECORD,'RECORD'),
		(DESIGN,'DESIGN'),
		(CODING,'CODING'),
	]
	amount = models.PositiveIntegerField()
	created_by = models.ForeignKey(User,on_delete=models.CASCADE)
	created_at = models.DateTimeField(auto_now_add=True)
	type = models.CharField(max_length=12,choices=WORK_OPTIONS)