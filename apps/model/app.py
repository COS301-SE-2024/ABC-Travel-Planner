import json
from datasets import load_dataset
from sentence_transformers import SentenceTransformer, InputExample, losses, util
from torch.utils.data import DataLoader
from datasets import Dataset

# Load your dataset
with open('travel_planning_dataset.json', 'r') as f:
    dataset = json.load(f)

train_data = {'text1': [], 'text2': [], 'label': []}
for entry in dataset:
    train_data['text1'].append(entry['sentence1'])
    train_data['text2'].append(entry['sentence2'])
    train_data['label'].append(entry['label'])


train_dataset = Dataset.from_dict(train_data)

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Create input examples for training
train_examples = [
    InputExample(texts=[row['text1'], row['text2']], label=float(row['label']))
    for row in train_dataset
]

# Define a DataLoader to load your data
train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=64)

# Define the loss function
train_loss = losses.CosineSimilarityLoss(model=model)

# Fine-tune the model
model.fit(
    train_objectives=[(train_dataloader, train_loss)],
    epochs=100,
    warmup_steps=100,
    output_path='fine_tuned_model'
)

#Evaluate model

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

new_sentence1 = "How do I find cheap flights?"
new_sentence2 = "What are the best ways to save money on flight tickets?"

embedding1 = fine_tuned_model.encode(new_sentence1, convert_to_tensor=True)
embedding2 = fine_tuned_model.encode(new_sentence2, convert_to_tensor=True)

cosine_sim = util.pytorch_cos_sim(embedding1, embedding2).item()
print(f"Cosine Similarity between the sentences: {cosine_sim}")
