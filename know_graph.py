import json
import spacy
import networkx as nx
import matplotlib.pyplot as plt
import random

# 加载中文模型
nlp = spacy.load("zh_core_web_sm")

# 读取清洗后的题目文件和知识点文件
with open("cleaned_questions.txt", "r", encoding="utf-8") as file:
    questions = file.readlines()

with open("knowledge_points.json", "r", encoding="utf-8") as file:
    knowledge_points = json.load(file)

# 创建图谱
G = nx.Graph()

# 记录知识点的权重和颜色
knowledge_point_weight = {}
knowledge_point_color = {}

# 将知识点作为节点添加到图谱中
for idx, question in enumerate(questions):
    for knowledge_point in knowledge_points[idx]:
        if knowledge_point in knowledge_point_weight:
            knowledge_point_weight[knowledge_point] += 1
        else:
            knowledge_point_weight[knowledge_point] = 1

        # 设置题目颜色并记录知识点颜色
        if idx not in knowledge_point_color:
            color = [random.uniform(0.3, 0.9) for _ in range(3)]  # 随机选择颜色，明度在0.5到0.9之间
            knowledge_point_color[idx] = color
        if knowledge_point in knowledge_point_color:
            knowledge_point_color[knowledge_point].append(knowledge_point_color[idx])
        else:
            knowledge_point_color[knowledge_point] = [knowledge_point_color[idx]]

# 添加边
for idx, question in enumerate(questions):
    for knowledge_point1 in knowledge_points[idx]:
        for knowledge_point2 in knowledge_points[idx]:
            if knowledge_point1 != knowledge_point2:
                if G.has_edge(knowledge_point1, knowledge_point2):
                    G.edges[knowledge_point1, knowledge_point2]['weight'] += 1
                else:
                    G.add_edge(knowledge_point1, knowledge_point2, weight=1)

# 设置节点的大小和颜色
node_sizes = [knowledge_point_weight[k] * 500 for k in G.nodes]
node_colors = []
for k in G.nodes:
    # 检查知识点在哪些题目中出现
    question_colors = knowledge_point_color[k]
    # 如果知识点在多个题目中出现，则将颜色叠加
    if len(question_colors) > 1:
        color = [sum(c[i] for c in question_colors) / len(question_colors) for i in range(3)]
        node_colors.append(color)
    else:
        node_colors.append(question_colors[0])

# 获取边的列表，仅包括权重大于等于3的边
edges = [(u, v) for u, v, d in G.edges(data=True) if d['weight'] >= 5]

# 绘制知识图谱
plt.figure(figsize=(12, 8))
pos = nx.spring_layout(G)

# 绘制节点
nx.draw(G, pos, with_labels=True, font_size=8, font_family='SimHei', node_color=node_colors, node_size=node_sizes)

# 绘制边
nx.draw_networkx_edges(G, pos, edgelist=edges, width=0.5, edge_color='gray')

plt.title('Knowledge Graph')
plt.show()
