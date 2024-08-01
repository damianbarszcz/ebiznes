from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
import requests
import json
import random
import re
import os
app = Flask(__name__)
CORS(app)

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
Session(app)

ollama_url = "http://localhost:11434/api/chat"

openings = [
    "Good morning, Damian. How can I help you?",
    "Hi, Damian! How can I assist you today?",
    "Hello, Damian! What questions do you have today?",
    "Hey, Damian! I'm here to help. What can I do for you?",
    "Hi there, Damian! I'm a customer support bot. How can I assist you?"
]

closings = [
    "Thank you for using our services, Damian. Have a great day!",
    "Thanks for the conversation, Damian! Have a nice day!",
    "I hope I answered all your questions, Damian. See you soon!",
    "If you need any more help, Damian, I'm here. Goodbye!",
    "Thank you for using my help, Damian. Have a wonderful day!"
]

def get_opening():
    if 'opening' not in session:
        session['opening'] = random.choice(openings)
    return session['opening']

def get_closing():
    if 'closing' not in session:
        session['closing'] = random.choice(closings)
    return session['closing']

def analyze_text(text):
    greeting_keywords = ['hello', 'hi', 'hey', 'good morning']
    goodbye_keywords = ['goodbye', 'bye', 'see you', 'later', 'end']

    text_lower = text.lower()

    if any(re.search(r'\b' + re.escape(keyword) + r'\b', text_lower) for keyword in greeting_keywords):
        return 'greet'
    elif any(re.search(r'\b' + re.escape(keyword) + r'\b', text_lower) for keyword in goodbye_keywords):
        return 'goodbye'
    else:
        return 'query'

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    query_text = data.get('query')

    if not query_text:
        return jsonify({"error": "Query text is required"}), 400

    message_type = analyze_text(query_text)

    if message_type == 'greet':
        response_text = get_opening()
        return jsonify({"response": response_text})
    elif message_type == 'goodbye':
        response_text = get_closing()
        return jsonify({"response": response_text})
    else:
        data = {
            "model": "llama3",
            "messages": [{
                "role": "user",
                "content": query_text
            }],
            "max_length": 2000
        }
        headers = {'Content-Type': 'application/json'}
        response = requests.post(ollama_url, headers=headers, data=json.dumps(data), stream=True)

        full_response = ""
        if response.status_code == 200:
            for line in response.iter_lines():
                if line:
                    part = json.loads(line.decode('utf-8'))
                    full_response += part.get('message', {}).get('content', '')

            if not full_response:
                full_response = 'No response'

            return jsonify({"response": full_response})
        else:
            return jsonify({"error": f"Error: {response.status_code} - {response.text}"}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)