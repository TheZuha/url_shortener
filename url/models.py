from django.db import models
import random
import string

def generate_short_code():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

class URL(models.Model):
    url = models.URLField(max_length=200)
    short_code = models.CharField(max_length=50, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    count = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.short_code:
            while True:
                code = generate_short_code()
                if not URL.objects.filter(short_code=code).exists():
                    self.short_code = code
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return self.url
