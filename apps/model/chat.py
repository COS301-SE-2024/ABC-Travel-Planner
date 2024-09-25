# import json
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_community.vectorstores import FAISS
# from langchain.schema import Document
# from transformers import pipeline, AutoModelForTokenClassification, AutoTokenizer, AutoModelForSeq2SeqLM
# import torch
# import os
# import sys
# import logging
# import random
# from dotenv import load_dotenv

# logging.basicConfig(level=logging.ERROR)

# if os.getenv('ENV') == 'development':
#     dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env.local')
#     load_dotenv(dotenv_path)

# device = 0 if torch.cuda.is_available() else -1


# ner_model = None
# ner_tokenizer = None
# rephraser_model = None
# rephraser_tokenizer = None
# classifier = None

# def preload_models():
#     global ner_model, ner_tokenizer, rephraser_model, rephraser_tokenizer, classifier

#     ner_model_name = "dbmdz/bert-large-cased-finetuned-conll03-english"
#     ner_model = AutoModelForTokenClassification.from_pretrained(ner_model_name)
#     ner_tokenizer = AutoTokenizer.from_pretrained(ner_model_name)

#     rephrasing_model_name = "tuner007/pegasus_paraphrase"
#     rephraser_model = AutoModelForSeq2SeqLM.from_pretrained(rephrasing_model_name)
#     rephraser_tokenizer = AutoTokenizer.from_pretrained(rephrasing_model_name)

#     classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", device=device)

# preload_models()

# # These models have already been loaded
# ner = pipeline("ner", model=ner_model, tokenizer=ner_tokenizer, aggregation_strategy="simple", device=device) 
# rephraser = pipeline("text2text-generation", model=rephraser_model, tokenizer=rephraser_tokenizer, device=device)

# with open("chatbot_data.json", "r") as file:
#     data = json.load(file)

# documents = []
# for entry in data:
#     combined_text = f"Question: {entry['question']}\nContext: {entry['context']}"
#     doc = Document(page_content=combined_text, metadata={"answer": entry['answer']})
#     documents.append(doc)

# os.environ["HUGGINGFACEHUB_API_TOKEN"] = os.getenv('HUGGINGFACEHUB_API_TOKEN')
# embeddings = HuggingFaceEmbeddings(model_name="fine_tuned_model")

# text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
# split_docs = text_splitter.split_documents(documents)
# db = FAISS.from_documents(split_docs, embeddings)

# def extract_location(query):
#     """Extract location entities (like cities or countries) from the user's query."""
#     entities = ner(query)
#     locations = [entity['word'] for entity in entities if entity['entity_group'] == 'LOC']
#     return locations

# def rephrase_answer(answer):
#     """Rephrase the answer to maintain length but change a few words."""
#     prompt = f"Rephrase this while maintaining the meaning: {answer}"
#     rephrased_answer = rephraser(prompt, max_length=150, num_beams=5, do_sample=True)
#     rephrased_text = rephrased_answer[0]["generated_text"].strip()
#     return rephrased_text

# def is_query_related(query):
#     labels = ['travel-related', 'social-media-related', 'greeting', 'farewell', 'authentication', 'account-management']
#     result = classifier(query, labels)

#     # Checking to see if the label has a high enough score to be considered relevant
#     if result['scores'][0] > 0.75:
#         return True
#     return False

# def main(query):
#     if not is_query_related(query):
#         return json.dumps({"query": query,"result": {
#         "answer": "Your query doesn't seem to be related to travel or social media. Please ask something relevant to our app."},
#         "type": "error"
#         }, indent=2)

#     locations = extract_location(query)
#     location_str = ", ".join(locations) if locations else ""

#     similar_docs = db.similarity_search(query, k=2)
#     if not similar_docs:
#         return json.dumps({"query": query, "result": {"answer": "Your query doesn't seem to be related to travel or social media. Please ask something relevant to our app."},
#                 "type": "error"}, indent=2)

#     best_doc = similar_docs[0]
#     if location_str:
#         original_answer = f"{best_doc.metadata['answer']} for {location_str}"
#     else:
#         original_answer = best_doc.metadata['answer']

#     if random.random() < 0.5:
#         rephrased = rephrase_answer(original_answer)
#         final_answer = rephrased
#     else:
#         final_answer = original_answer

#     return json.dumps({"query": query, "result": {
#         "answer": final_answer
#     }, "type": "response"}, indent=2)

# if __name__ == "__main__":
#     query = sys.argv[1]
#     print(main(query))



import json
from flask import Flask, request, jsonify
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.schema import Document
from transformers import pipeline, AutoModelForTokenClassification, AutoTokenizer, AutoModelForSeq2SeqLM
import torch
import os
import logging
import random
from dotenv import load_dotenv

# Setup logging
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
rephraser_model = None
rephraser_tokenizer = None
classifier = None

def preload_models():
    global ner_model, ner_tokenizer, rephraser_model, rephraser_tokenizer, classifier

    ner_model_name = "dbmdz/bert-large-cased-finetuned-conll03-english"
    ner_model = AutoModelForTokenClassification.from_pretrained(ner_model_name)
    ner_tokenizer = AutoTokenizer.from_pretrained(ner_model_name)

    rephrasing_model_name = "tuner007/pegasus_paraphrase"
    rephraser_model = AutoModelForSeq2SeqLM.from_pretrained(rephrasing_model_name)
    rephraser_tokenizer = AutoTokenizer.from_pretrained(rephrasing_model_name)

    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", device=device)

# Preload models
preload_models()

# Initialize pipelines
ner = pipeline("ner", model=ner_model, tokenizer=ner_tokenizer, aggregation_strategy="simple", device=device) 
rephraser = pipeline("text2text-generation", model=rephraser_model, tokenizer=rephraser_tokenizer, device=device)

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

def extract_location(query):
    """Extract location entities (like cities or countries) from the user's query."""
    entities = ner(query)
    locations = [entity['word'] for entity in entities if entity['entity_group'] == 'LOC']
    return locations

def rephrase_answer(answer):
    """Rephrase the answer to maintain length but change a few words."""
    prompt = f"Rephrase this while maintaining the meaning: {answer}"
    rephrased_answer = rephraser(prompt, max_length=150, num_beams=5, do_sample=True)
    rephrased_text = rephrased_answer[0]["generated_text"].strip()
    return rephrased_text

def is_query_related(query):
    labels = ['travel-related', 'social-media-related', 'greeting', 'farewell', 'authentication', 'account-management']
    result = classifier(query, labels)
    if result['scores'][0] > 0.75:
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

    locations = extract_location(query)
    location_str = ", ".join(locations) if locations else ""

    similar_docs = db.similarity_search(query, k=2)
    if not similar_docs:
        return jsonify({
            "query": query,
            "result": {"answer": "Your query doesn't seem to be related to travel or social media. Please ask something relevant to our app."},
            "type": "error"
        })

    best_doc = similar_docs[0]
    original_answer = f"{best_doc.metadata['answer']} for {location_str}" if location_str else best_doc.metadata['answer']

    if random.random() < 0.5:
        final_answer = rephrase_answer(original_answer)
    else:
        final_answer = original_answer

    return jsonify({
        "query": query,
        "result": {"answer": final_answer},
        "type": "response"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

