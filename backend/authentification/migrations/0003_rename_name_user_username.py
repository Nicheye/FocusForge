# Generated by Django 4.2.6 on 2023-11-09 21:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0002_alter_user_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='name',
            new_name='username',
        ),
    ]
