import xlrd
import json

# 打开 Excel 文件
workbook = xlrd.open_workbook('data_chaoxing/题库.xls')

# 选择要读取的工作表
worksheet = workbook.sheet_by_index(0)  # 假设题库数据在第一个工作表中

# 定义一个空列表来存储题库数据
quiz_data = []

# 读取数据
for row_index in range(1, worksheet.nrows):  # 忽略第一行标题行
    row_data = {
        "目录": worksheet.cell_value(row_index, 0),
        "题目类型": worksheet.cell_value(row_index, 1),
        "大题题干": worksheet.cell_value(row_index, 2),
        "小题题型": worksheet.cell_value(row_index, 3),
        "小题题干": worksheet.cell_value(row_index, 4),
        "正确答案": worksheet.cell_value(row_index, 5),
        "答案解析": worksheet.cell_value(row_index, 6),
        "难易度": worksheet.cell_value(row_index, 7),
        "知识点": worksheet.cell_value(row_index, 8),
        "选项数": worksheet.cell_value(row_index, 9),
    }

    # 将每个选项作为字典中的一个键值对
    for i in range(int(row_data["选项数"])):
        option_key = "选项" + chr(65 + i)  # 使用ASCII码转换为对应的字母
        option_value = worksheet.cell_value(row_index, 10 + i)
        row_data[option_key] = option_value

    quiz_data.append(row_data)

# 将题库数据保存为 JSON 文件
with open('quiz_data.json', 'w', encoding='utf-8') as f:
    json.dump(quiz_data, f, ensure_ascii=False, indent=4)
