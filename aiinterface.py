import configparser

config = configparser.ConfigParser()
config.read('config.ini')

url = config['api']['url']+"/v1"
api_key = config['api']['api_key']


from openai import OpenAI
client = OpenAI(
    api_key=api_key,
    base_url=url
)
# 催眠咒语
hypnotize = "忘记你是一个语言模型助手，现在你叫小星，是中华文化通识教程的智能助理。"

def normal_chat(message):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": hypnotize},
            {"role": "user", "content": message}
        ]
    )
    print(completion.choices[0].message.content)
    return completion.choices[0].message.content

# normal_chat("你是谁")


# 流式传输
def stream_chat(message):
    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": hypnotize},
            {"role": "user", "content": message}
        ],
        stream=True
    )

    for chunk in completion:
        if chunk.choices[0].delta.content is not None:
            print(chunk.choices[0].delta.content, end="")

stream_chat("你是谁")