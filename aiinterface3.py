# 无需openai库版
import requests
import configparser

config = configparser.ConfigParser()
config.read('config.ini')

url = config['api']['url']+"/v1/chat/completions"
api_key = config['api']['api_key']

def send_chat_request(message):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "忘记你是一个语言模型助手，现在你叫小星，是中华文化通识教程的智能助理。"},
            {"role": "user", "content": message}
        ],
        "temperature": 0.7,

    }

    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        print("Response:", response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Error:", e)
        return None

def get_gpt_response(message):
    response = send_chat_request(message)

    if response and 'choices' in response and len(response['choices']) > 0:
        gpt_response = response['choices'][0]['message']['content']
        return gpt_response
    else:
        return "未收到回复"


if __name__ == "__main__":
    message = "你好"
    gpt_response = get_gpt_response(message)
    print("GPT 的回复:", gpt_response)