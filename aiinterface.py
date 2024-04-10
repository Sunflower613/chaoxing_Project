from openai import OpenAI

# 替换为您的实际 OpenAI API Key
YOUR_API_KEY = "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"

# 替换为您的 OpenAI API 转发的网址
BASE_URL = "https://d4fbc55d54a4106f7911f1ca6a93845a.api-forwards.com/v1"

# 创建 OpenAI 客户端对象
client = OpenAI(
    base_url=BASE_URL,
    api_key=YOUR_API_KEY
)

# 示例请求数据
data = {
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "Hello!"
        }
    ]
}

# 发送 POST 请求到转发的 API 端点
response = client.post("chat/completions", data = data)

# 处理响应
if response.status_code == 200:
    print(response.json())
else:
    print("Error:", response.status_code, response.text)
