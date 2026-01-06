import re
import fasttext
import nltk
from nltk.corpus import stopwords
from fastapi import FastAPI
from pydantic import BaseModel

# baixar stopwords (só na primeira vez)
nltk.download("stopwords")

stop_words = set(stopwords.words("english"))

# carregar modelo
model = fasttext.load_model("model_fasttext.bin")

app = FastAPI(title="Text Classification API")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LABEL_MAP = {
    "0": "Politics",
    "1": "Sport",
    "2": "Technology",
    "3": "Entertainment",
    "4": "Business"
}


# schema de entrada
class TextInput(BaseModel):
    text: str

def preprocess(text: str) -> str:
    text = re.sub(r'[^\w\s]', ' ', text)
    text = text.lower()
    text = re.sub(r'\s+', ' ', text).strip()
    tokens = [word for word in text.split() if word not in stop_words]
    return " ".join(tokens)

@app.post("/predict")
def predict(data: TextInput):
    processed_text = preprocess(data.text)

    labels, probabilities = model.predict(processed_text)

    raw_label = labels[0].replace("__label__", "")
    label_name = LABEL_MAP.get(raw_label, "Unknown")

    return {
        "text": data.text,
        "processed_text": processed_text,
        "label_id": int(raw_label),
        "label_name": label_name,
        "confidence": float(probabilities[0])
    }

