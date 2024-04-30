import pandas as pd

# 读取 Excel 文件
excel_file = "data_chaoxing/题库.xls"
df = pd.read_excel(excel_file)

# 打印前几行数据
print("前几行数据:")
print(df.head())

# 根据题目类型、知识点等进行过滤
def recommend_content(df, 目录, 知识点):
    # 根据目录和知识点进行过滤
    filtered_df = df[(df["目录"] == 目录) & (df["知识点"] == 知识点)]
    return filtered_df

# 示例：推荐 "某个目录" 中的 "某个知识点" 的题目
目录 = "某个目录"
知识点 = "某个知识点"
相关题目 = recommend_content(df, 目录, 知识点)

# 打印相关题目
print("相关题目:")
print(相关题目)
