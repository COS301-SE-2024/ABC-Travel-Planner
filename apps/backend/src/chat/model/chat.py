import json
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.schema import Document
from transformers import pipeline, AutoModelForTokenClassification, AutoTokenizer, AutoModelForSeq2SeqLM
import os
import sys
import logging
import warnings

logging.basicConfig(level=logging.ERROR)

# Global variables to hold models
ner_model = None
ner_tokenizer = None
rephraser_model = None
rephraser_tokenizer = None

# Pre-download and cache the models
def preload_models():
    global ner_model, ner_tokenizer, rephraser_model, rephraser_tokenizer

    ner_model_name = "dbmdz/bert-large-cased-finetuned-conll03-english"
    ner_model = AutoModelForTokenClassification.from_pretrained(ner_model_name)
    ner_tokenizer = AutoTokenizer.from_pretrained(ner_model_name)

    rephrasing_model_name = "tuner007/pegasus_paraphrase"
    rephraser_model = AutoModelForSeq2SeqLM.from_pretrained(rephrasing_model_name)
    rephraser_tokenizer = AutoTokenizer.from_pretrained(rephrasing_model_name)

preload_models()

# Initialize the pipelines after preloading models
ner = pipeline("ner", model=ner_model, tokenizer=ner_tokenizer, aggregation_strategy="simple", device=-1)
rephraser = pipeline("text2text-generation", model=rephraser_model, tokenizer=rephraser_tokenizer, device=-1)

# Load dataset
with open("src/chat/model/chatbot_data.json", "r") as file:
    data = json.load(file)

# Combine question and context into documents
documents = []
for entry in data:
    combined_text = f"Question: {entry['question']}\nContext: {entry['context']}"
    doc = Document(page_content=combined_text, metadata={"answer": entry['answer']})
    documents.append(doc)

# Hugging Face embedding and FAISS index
os.environ["HUGGINGFACEHUB_API_TOKEN"] = "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"
embeddings = HuggingFaceEmbeddings(model_name="src/chat/model/fine_tuned_model")

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
split_docs = text_splitter.split_documents(documents)
db = FAISS.from_documents(split_docs, embeddings)

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

def main(query):
    locations = extract_location(query)
    location_str = ", ".join(locations) if locations else ""

    similar_docs = db.similarity_search(query, k=2)
    if not similar_docs:
        return json.dumps({"query": query, "results": []}, indent=2)

    best_doc = similar_docs[0]
    if location_str:
        original_answer = f"{best_doc.metadata['answer']} for {location_str}"
    else:
        original_answer = best_doc.metadata['answer']

    rephrased = rephrase_answer(original_answer)

    return json.dumps({"query": query, "result": {
        "answer": rephrased
    }}, indent=2)

if __name__ == "__main__":
    query = sys.argv[1]
    print(main(query))


