import os
from flask import Flask
from flask import send_from_directory

static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)

@app.route('/')
def root():
    return send_from_directory(static_file_dir, 'index.html')
    
@app.route('/<path:path>')
def send_js(path):
    return send_from_directory(static_file_dir, path)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)

