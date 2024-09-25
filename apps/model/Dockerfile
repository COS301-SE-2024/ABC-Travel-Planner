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

# Expose the port that Gunicorn will use
EXPOSE 5000

# Use ENTRYPOINT instead of CMD to ensure argument passing works properly
ENTRYPOINT ["gunicorn", "--workers=1", "--timeout=60", "--bind", "0.0.0.0:$PORT", "chat:app"]
