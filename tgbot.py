import telebot
import requests
import time
from bs4 import BeautifulSoup

channel_id = "FocusForge_bot"  # Ваш логин канала
bot = telebot.TeleBot('6832549788:AAFCAMTdw4WcbDVRUDhT4X0774pvm_VXx6w')

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, 'Привет введите id')
    bot.register_next_step_handler(message, data)

@bot.message_handler(commands=['data'])
def data(message):
    global id
    try:
        id = int(message.text.strip())
    except ValueError:
        bot.send_message(message.chat.id, "неверный формат, впишите id")
        bot.register_next_step_handler(message, data)
        return
    while True:
        get_data(message,id)
        time.sleep(259200)
        

    
def get_data(message,id):
    r = requests.get(f'http://127.0.0.1:8000/api/v1/main/{id}/')
    data = r.json()
    formatted_text = (
       f"""<b>Вы работали </b> \n
       <b>Design</b> {data['design_hours']} часов ( {data['design_mins']} минут) \n
       	<b>Coding</b> {data['code_hours']} часов ( {data['code_mins']} минут) \n
		<b>Record</b> {data['record_hours']} часов ( {data['record_mins']} минут) \n
        <b>Вы работали за последние 2 недели </b> \n
        <b>Design</b> {data['designing_hours_last_two_weeks']} часов ( {data['designing_last_two_weeks']} минут) \n
       	<b>Coding</b> {data['coding_hours_last_two_weeks']} часов ( {data['coding_last_two_weeks']} минут) \n
		<b>Record</b> {data['recording_hours_last_two_weeks']} часов ( {data['recording_last_two_weeks']} минут) \n""",
           
    )
    bot.send_message(message.chat.id, formatted_text,parse_mode='HTML')
    
bot.polling(non_stop=True)
