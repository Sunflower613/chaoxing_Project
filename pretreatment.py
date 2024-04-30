import spacy
import json

# 加载中文模型（zh_core_web_sm为spaCy的中文模型）
nlp = spacy.load("zh_core_web_sm")

# 读取清洗后的题目文件
cleaned_questions = []
with open("cleaned_questions.txt", "r", encoding="utf-8") as file:
    cleaned_questions = file.readlines()

# 定义一个函数来提取名词
def extract_nouns(text):
    nouns = set()
    doc = nlp(text)
    for token in doc:
        if token.pos_ == 'NOUN':  # 如果词性为名词
            nouns.add(token.text)
    return list(nouns)

# 提取每个题目的知识点
knowledge_points = []
for question_text in cleaned_questions:
    nouns = extract_nouns(question_text)
    knowledge_points.append(nouns)

# 将提取的知识点保存为 JSON 文件
with open("knowledge_points.json", "w", encoding="utf-8") as file:
    json.dump(knowledge_points, file, ensure_ascii=False, indent=4)
