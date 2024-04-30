
from flask import Flask, jsonify, render_template, send_from_directory, request

import aiinterface
import aiinterface3

app = Flask(__name__, static_folder='static')

# 模拟返回目录数据的路由
@app.route('/get_directory_data')
def get_directory_data():
    return send_from_directory(directory='.', filename='directory_data.json')

@app.route('/get_quiz_data')
def get_quiz_data():
    return send_from_directory(directory='.', filename='quiz_data.json')

@app.route("/get_gpt_response", methods=["POST"])
def get_gpt_response():
    data = request.json
    user_message = data.get("message")
    gpt_response = aiinterface.normal_chat(user_message)
    return jsonify(gpt_response)

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
