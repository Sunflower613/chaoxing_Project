import json

# 读取quiz_data.json文件
with open("quiz_data.json", "r", encoding="utf-8") as file:
    quiz_data = json.load(file)


def know_points(quiz_data):
    know_point = set()
    for item in quiz_data:
        know_point.add(item["知识点"])
    return list(know_point)


# 将清洗后的大题题干保存到文件
with open("know_point.txt", "w", encoding="utf-8") as file:
    for question in know_points(quiz_data):
        file.write(question + "\n")
