import json
import re

# 读取quiz_data.json文件
with open("quiz_data.json", "r", encoding="utf-8") as file:
    quiz_data = json.load(file)

# 提取题目信息并进行清洗
cleaned_questions = []
for item in quiz_data:
    question_text = item["大题题干"] + item["小题题干"]
    # 去除HTML标签和转义字符
    clean_text = re.sub(r'<[^>]+>|&nbsp;|&quot;|\b[Pp]?\d+\b|【[^】]+】|_', '', question_text)
    clean_text = clean_text.replace('\n', '')  # 去除换行符
    cleaned_questions.append(clean_text)

# 将清洗后的题目信息保存到文件
with open("cleaned_questions.txt", "w", encoding="utf-8") as file:
    for question in cleaned_questions:
        file.write(question + "\n")
