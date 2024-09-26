import json
from flask import Flask, request, jsonify
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.schema import Document
from transformers import pipeline #, AutoModelForTokenClassification, AutoTokenizer, AutoModelForSeq2SeqLM
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

def preload_models():
    global ner_model, ner_tokenizer, classifier

    # ner_model_name = "dbmdz/bert-large-cased-finetuned-conll03-english"
    # ner_model = AutoModelForTokenClassification.from_pretrained(ner_model_name)
    # ner_tokenizer = AutoTokenizer.from_pretrained(ner_model_name)

    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", device=device)

# Preload models
#preload_models()

# Initialize pipelines
#ner = pipeline("ner", model=ner_model, tokenizer=ner_tokenizer, aggregation_strategy="simple", device=device) 

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

# def extract_location(query):
#     """Extract location entities (like cities or countries) from the user's query."""
#     entities = ner(query)
#     locations = [entity['word'] for entity in entities if entity['entity_group'] == 'LOC']
#     return locations

def is_query_related(query):
    labels = ['travel-related', 'social-media-related', 'greeting', 'farewell', 'authentication', 'account-management']
    result = classifier(query, labels)
    if result['scores'][0] > 0.75:
        return True
    return False

@app.route('/query', methods=['POST'])
def process_query():
    query = request.json.get('query')
    # if not is_query_related(query):
    #     return jsonify({
    #         "query": query,
    #         "result": {"answer": "Your query doesn't seem to be related to travel or social media. Please ask something relevant to our app."},
    #         "type": "error"
    #     })

    # locations = extract_location(query)
    # location_str = ", ".join(locations) if locations else ""

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
