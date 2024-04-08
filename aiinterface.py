import requests


def chatgpt(text):
    response = requests.get("https://www.doubao.com/chat?q=" + text)
    if response.status_code == 200:
        return response.json()
    else:
        return "Error:  Unable  to  connect  to  ChatGPT  API"


#  调用示例
response = chatgpt("Hello")
print(response)
