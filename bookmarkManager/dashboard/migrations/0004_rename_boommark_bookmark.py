# Generated by Django 4.1.7 on 2023-03-08 01:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_category_boommark_category'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Boommark',
            new_name='Bookmark',
        ),
    ]
