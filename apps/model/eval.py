import json
from sentence_transformers import SentenceTransformer, util

# Load the fine-tuned model
fine_tuned_model = SentenceTransformer('fine_tuned_model')

# Load the test set
with open('test_set_data.json', 'r') as f:
    test_set = json.load(f)

# Evaluate the model
predicted_similarities = []
actual_similarities = []

for entry in test_set:
    # Encode the sentences into embeddings
    embedding1 = fine_tuned_model.encode(entry['sentence1'], convert_to_tensor=True)
    embedding2 = fine_tuned_model.encode(entry['sentence2'], convert_to_tensor=True)

    # Compute cosine similarity between the sentence embeddings
    cosine_sim = util.pytorch_cos_sim(embedding1, embedding2).item()

    # Store predicted and actual similarities for comparison
    predicted_similarities.append(cosine_sim)
    actual_similarities.append(entry['similarity'])

# Calculate evaluation metrics
from sklearn.metrics import mean_squared_error, r2_score

mse = mean_squared_error(actual_similarities, predicted_similarities)
r2 = r2_score(actual_similarities, predicted_similarities)

print(f"Mean Squared Error: {mse}")
print(f"R^2 Score: {r2}")

# Example usage of the fine-tuned model
new_sentence1 = "How do I find cheap flights?"
new_sentence2 = "What are the best ways to save money on flight tickets?"

# Encode the new sentences
embedding1 = fine_tuned_model.encode(new_sentence1, convert_to_tensor=True)
embedding2 = fine_tuned_model.encode(new_sentence2, convert_to_tensor=True)

# Compute cosine similarity
cosine_sim = util.pytorch_cos_sim(embedding1, embedding2).item()
print(f"Cosine Similarity between the sentences: {cosine_sim}")
