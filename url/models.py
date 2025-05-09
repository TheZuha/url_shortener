from django.db import models
import random
import string


# Create your models here.
def generate_short_code():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))


class URL(models.Model):
    url = models.URLField(max_length=200)
    short_code = models.CharField(max_length=50, unique=True, default=generate_short_code())
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    count = models.IntegerField(default=0)
    
    def __str__(self):
        return self.url