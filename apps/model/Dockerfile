# Use the official Python image as the base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy the requirements.txt to the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Expose the port that Flask will use
EXPOSE 5000

# Run the Flask app
CMD ["python3", "chat.py"]
