from django.contrib import admin
from .models import AAAproject

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

# Register your models here.

admin.site.register(AAAproject, TodoAdmin)