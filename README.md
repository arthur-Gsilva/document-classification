# 🧠 Text Classification API

This project is a **text classification system** built with **FastAPI** and **FastText**, capable of categorizing English texts into predefined classes such as Politics, Sports, Technology, Entertainment, and Business.

In addition to the API, the project also includes a **simple HTML front-end** that allows users to test the classifier directly from the browser.

---

## 🚀 Features

- Text preprocessing (lowercase, punctuation removal, stopwords filtering)
- FastText-based classification model
- REST API built with FastAPI
- Confidence score for predictions
- CORS enabled for frontend integration
- Lightweight HTML interface for testing predictions

---

## 🏷️ Classification Labels

| ID | Category        |
|----|-----------------|
| 0  | Politics        |
| 1  | Sport           |
| 2  | Technology      |
| 3  | Entertainment   |
| 4  | Business        |

---

## 📦 Tech Stack

**Backend**
- Python
- FastAPI
- FastText
- NLTK
- Pydantic
- Uvicorn

**Frontend**
- HTML
- CSS
- Vanilla JavaScript (fetch API)

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/text-classifier-api.git
cd text-classifier-api

```
### install dependecies
pip install -r requirements.txt

### running Api
uvicorn main:app --reload
