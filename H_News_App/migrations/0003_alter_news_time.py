# Generated by Django 4.0.4 on 2022-05-14 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('H_News_App', '0002_alter_news_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='time',
            field=models.DateTimeField(blank=True),
        ),
    ]
