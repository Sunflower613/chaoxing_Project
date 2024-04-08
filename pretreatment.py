import spacy
import pandas as pd

from collections import defaultdict

# 加载spaCy的英文模型
nlp = spacy.load("en_core_web_sm")

# 读取题库文件
df = pd.read_excel("data_chaoxing/题库.xls")

# 数据清洗，去除空值和不必要的列
df.dropna(subset=['大题题干', '小题题干'], inplace=True)
df = df[['大题题干', '小题题干']]

# 合并题目内容为一列
df['题目内容'] = df['大题题干'] + ' ' + df['小题题干']

# 定义一个函数来提取实体
def extract_entities(text):
    entities = defaultdict(list)
    doc = nlp(text)
    for ent in doc.ents:
        entities[ent.label_].append(ent.text)
    return entities

# 提取实体
df['实体'] = df['题目内容'].apply(extract_entities)

# 查看提取的实体信息
print(df['实体'].head())
