from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Title(models.Model):
    title_name  = models.CharField(max_length=264)
    u_id = models.ForeignKey(User,on_delete = models.CASCADE)
    def __str__(self):
        return self.title_name

class ListContent(models.Model):
    lab_id = models.ForeignKey('Title',on_delete = models.DO_NOTHING)
    item_entry_name = models.TextField(max_length=256)
    remainder_date = models.DateTimeField()
    check_status = models.BooleanField()

    def __str__(self):
        return self.item_entry_name
