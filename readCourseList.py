# import os
#
# # 指定目录路径
# directory_path = "data_chaoxing/课件"
#
# # 获取目录中的文件名称
# def get_ppt_names(directory_path):
#     ppt_names = []
#     # 遍历目录中的文件和子目录
#     for filename in os.listdir(directory_path):
#         # 判断是否为文件
#         if os.path.isfile(os.path.join(directory_path, filename)):
#             # 如果是文件，则将文件名添加到列表中
#             ppt_names.append(filename)
#     return ppt_names
#
# # 调用函数获取目录中的文件名称
# ppt_names = get_ppt_names(directory_path)
# print(ppt_names)  # 输出目录中的文件名称列表
# 课件内容
courseware = ['第一讲：有用之用与无用之用.pptx', '第七讲：禅观自在+禅悦人生+无动画版.pptx', '第三讲：仁和精神与文明对话（上）.pptx', '第九讲：生命境界的盲瞽与醒悟.pptx', '第二讲：弱德之美——上善若水，道法自然.pptx', '第五讲：务本固本+内圣外王.pptx', '第八讲：以史为鉴——历史的星空.pptx', '第六讲：周易的基本人文精神.pptx', '第十一讲：世界记忆之《黄帝内经》与《本草纲目》（3）.pptx', '第十一讲：中医学与中华文明（2）.pptx', '第十一讲：太极与养生（1）.pptx', '第十三讲：匠人匠心——中华传统工艺精神.pptx', '第十二讲：六艺的启示——内外兼修与全息养成.pptx', '第十讲：东方神韵——古典服饰中的美学元素（4）.pptx', '第十讲：花木诗词鉴赏（2）.pptx', '第十讲：诗心与诗境（3）.pptx', '第十讲：风骨与情韵——走向振奋的大唐诗歌（1）.pptx', '第四讲：“礼乐文化”与“知行合一”.pptx']

# 初始化课件字典
courseware_dict = {}

# 遍历课件内容，拆分为字典格式
for item in courseware:
    # 以冒号分隔讲数和标题
    parts = item.split('：')
    lecture = parts[0]  # 讲数
    title = parts[1]  # 标题

    # 如果讲数不在字典中，则添加一个键值对
    if lecture not in courseware_dict:
        courseware_dict[lecture] = [title]
    else:
        # 如果讲数已经存在，则将标题添加到对应的值中
        courseware_dict[lecture].append(title)

# 输出课件字典
print(courseware_dict)
