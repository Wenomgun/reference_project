from django.db import models

class Banks(models.Model):
    bik = models.CharField(max_length = 9)
    name = models.CharField(max_length = 50)
    cornumber = models.CharField(max_length=50)
    adress = models.CharField(max_length=150)

    def __str__(self):
        return "Bank name: %s , bank BIK: %s, ID: %s" % (self.name, self.bik, self.id)

