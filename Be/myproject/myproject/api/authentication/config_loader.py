# config_loader.py
import json
import os

def load_config():
    # Sử dụng đường dẫn tương đối
    config_path = os.path.join(os.path.dirname(__file__), 'config.json')
    with open(config_path) as config_file:
        config = json.load(config_file)
    return config

config = load_config()
gmail_user = config['gmail_user']
app_password = config['app_password']
