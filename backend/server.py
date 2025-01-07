# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import sys
# import io
# import os
# import traceback

# app = Flask(__name__)
# CORS(app)

# @app.route('/')
# def home():
#     return "Flask app is running!"

# @app.route('/execute', methods=['POST'])
# def execute_code():
#     code = request.json.get('code')
    
#     old_stdout = sys.stdout
#     sys.stdout = io.StringIO()

#     try:
#         exec(code)
#         output = sys.stdout.getvalue()
#     except Exception as e:
#         output = traceback.format_exc()
#     finally:
#         sys.stdout = old_stdout

#     return jsonify({'output': output})

# if __name__ == '__main__':
#     # Use dynamic port based on environment variable
#     app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sys
import io
import os
import traceback

app = Flask(__name__, static_folder='../frontend/build') 
CORS(app)

# Route for serving the React frontend
@app.route('/')
def home():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/execute', methods=['POST'])
def execute_code():
    code = request.json.get('code')
    
    old_stdout = sys.stdout
    sys.stdout = io.StringIO()

    try:
        exec(code)
        output = sys.stdout.getvalue()
    except Exception as e:
        output = traceback.format_exc()
    finally:
        sys.stdout = old_stdout

    return jsonify({'output': output})

if __name__ == '__main__':
    # Use dynamic port based on environment variable
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
