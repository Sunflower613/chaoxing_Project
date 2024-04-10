from flask import Flask, jsonify, render_template, send_from_directory

app = Flask(__name__, static_folder='static')

# 模拟返回目录数据的路由
@app.route('/get_directory_data')
def get_directory_data():

    directory_data = [
        {"title": "第一讲", "sub_items": ["有用之用与无用之用"]},
        {"title": "第二讲", "sub_items": ["弱德之美——上善若水，道法自然"]},
        {"title": "第三讲", "sub_items": ["仁和精神与文明对话（上）"]},
        {"title": "第四讲", "sub_items": ["“礼乐文化”与“知行合一”"]},
        {"title": "第五讲", "sub_items": ["务本固本+内圣外王"]},
        {"title": "第六讲", "sub_items": ["周易的基本人文精神"]},
        {"title": "第七讲", "sub_items": ["禅观自在+禅悦人生+无动画版"]},
        {"title": "第八讲", "sub_items": ["以史为鉴——历史的星空"]},
        {"title": "第九讲", "sub_items": ["生命境界的盲瞽与醒悟"]},
        {"title": "第十讲", "sub_items": ["风骨与情韵——走向振奋的大唐诗歌（1）", "花木诗词鉴赏（2）", "诗心与诗境（3）", "东方神韵——古典服饰中的美学元素（4）"]},
        {"title": "第十一讲", "sub_items": ["太极与养生（1）", "中医学与中华文明（2）", "世界记忆之《黄帝内经》与《本草纲目》（3）"]},
        {"title": "第十二讲", "sub_items": ["六艺的启示——内外兼修与全息养成"]},
        {"title": "第十三讲", "sub_items": ["匠人匠心——中华传统工艺精神"]}
    ]

    return jsonify(directory_data)

@app.route('/get_quiz_data')
def get_quiz_data():
    return send_from_directory(directory='.', filename='quiz_data.json')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/studentcourse')
def studentcourse():
    return render_template('studentcourse.html')

@app.route('/recommend')
def recommend():
    return render_template('recommend.html')

@app.route('/QandA')
def QandA():
    return render_template('QandA.html')

if __name__ == '__main__':
    app.run(debug=True)
