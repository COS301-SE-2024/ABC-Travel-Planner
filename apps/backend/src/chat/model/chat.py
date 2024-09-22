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

warnings.filterwarnings("ignore", message="Some weights of the model checkpoint at")
warnings.filterwarnings("ignore", message="FutureWarning: `clean_up_tokenization_spaces` was not set.")

logging.basicConfig(level=logging.ERROR)

# Pre-download and cache the models
def preload_models():
    # Load and cache NER model
    ner_model_name = "dbmdz/bert-large-cased-finetuned-conll03-english"
    _ = AutoModelForTokenClassification.from_pretrained(ner_model_name)
    _ = AutoTokenizer.from_pretrained(ner_model_name)

    # Load and cache text2text generation model
    rephrasing_model_name = "tuner007/pegasus_paraphrase"
    _ = AutoModelForSeq2SeqLM.from_pretrained(rephrasing_model_name)
    _ = AutoTokenizer.from_pretrained(rephrasing_model_name)

preload_models()

with open("src/chat/model/chatbot_data.json", "r") as file:
    data = json.load(file)

# Combine question and context into documents
documents = []
for entry in data:
    combined_text = f"Question: {entry['question']}\nContext: {entry['context']}"
    doc = Document(page_content=combined_text, metadata={"answer": entry['answer']})
    documents.append(doc)

os.environ["HUGGINGFACEHUB_API_TOKEN"] = "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"

# Embedding the documents with Hugging Face's model
embeddings = HuggingFaceEmbeddings(model_name="src/chat/model/fine_tuned_model")

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
split_docs = text_splitter.split_documents(documents)

# Index the documents using FAISS for similarity search
db = FAISS.from_documents(split_docs, embeddings)

# Load the NER model
ner = pipeline("ner", model="dbmdz/bert-large-cased-finetuned-conll03-english", aggregation_strategy="simple", device=-1)

# Use the T5 model for rephrasing
rephraser = pipeline("text2text-generation", model="tuner007/pegasus_paraphrase", device=-1)

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

    similar_docs = db.similarity_search(query, k=3)
    if not similar_docs:
        return json.dumps({"query": query, "results": []}, indent=2)

    # Take the best answer (e.g., the first one, assuming the list is sorted by relevance)
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


