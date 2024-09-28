import json
from flask import Flask, request, jsonify
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.schema import Document
#from transformers import pipeline 
import torch
import os
import logging
import random
from dotenv import load_dotenv

logging.basicConfig(level=logging.ERROR)

# Load environment variables if in development
if os.getenv('ENV') == 'development':
    dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env.local')
    load_dotenv(dotenv_path)

# Determine the device (GPU or CPU)
device = 0 if torch.cuda.is_available() else -1

# Initialize models and pipelines
ner_model = None
ner_tokenizer = None
classifier = None

# Load dataset
with open("chatbot_data.json", "r") as file:
    data = json.load(file)

documents = []
for entry in data:
    combined_text = f"Question: {entry['question']}\nContext: {entry['context']}"
    doc = Document(page_content=combined_text, metadata={"answer": entry['answer']})
    documents.append(doc)

# Embedding and FAISS
os.environ["HUGGINGFACEHUB_API_TOKEN"] = os.getenv('HUGGINGFACEHUB_API_TOKEN')
embeddings = HuggingFaceEmbeddings(model_name="fine_tuned_model")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
split_docs = text_splitter.split_documents(documents)
db = FAISS.from_documents(split_docs, embeddings)

# Flask app setup
app = Flask(__name__)

def is_query_related(query):
    # Define keywords for each category
    travel_keywords = ['travel', 'itinerary', 'itineraries', 'trip', 'trips', 'date', 'country', 'items', 'attractions', 'attraction', 'destination', 'tour', 'booking', 'flight', 'vacation', 'hotel', 'accommodation', 'holiday', 'rental', 'airport taxi', 'sightseeing', 'creator', 'generate', 'generator', 'google', 'social media']
    social_media_keywords = ['post', 'like', 'comment', 'share', 'follow', 'login', 'logout', 'user', 'account', 'update', 'block', 'mute', 'profile', 'message', 'dm', 'friend', 'timeline', 'feed', 'story', 'share', 'dark mode', 'light mode', 'edit', 'image']
    greeting_keywords = ['hello', 'hi', 'good morning', 'good afternoon', 'hey', 'good evening', 'how are you', 'how is it going', 'good day', 'morning', 'afternoon', 'evening', 'greetings', 'what\'s up']
    farewell_keywords = ['goodbye', 'bye', 'see you', 'farewell', 'take care', 'later', 'catch you later', 'talk to you later', 'peace', 'adios', 'ciao', 'good night', 'so long', 'see you later', 'have a good day', 'good night', 'see ya']

    query_lower = query.lower()

    if any(word in query_lower for word in travel_keywords):
        return True
    elif any(word in query_lower for word in social_media_keywords):
        return True
    elif any(word in query_lower for word in greeting_keywords):
        return True
    elif any(word in query_lower for word in farewell_keywords):
        return True

    return False

@app.route('/query', methods=['POST'])
def process_query():
    query = request.json.get('query')
    if not is_query_related(query):
        return jsonify({
            "query": query,
            "result": {"answer": "Your query doesn't seem to be related to travel or social media. Please ask something relevant to our app."},
            "type": "error"
        })

    similar_docs = db.similarity_search(query, k=2)
    if not similar_docs:
        return jsonify({
            "query": query,
            "result": {"answer": "Your query doesn't seem to be related to travel or social media. Please ask something relevant to our app."},
            "type": "error"
        })

    best_doc = similar_docs[0]
    original_answer = best_doc.metadata['answer']

    return jsonify({
        "query": query,
        "result": {"answer": original_answer},
        "type": "response"
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
