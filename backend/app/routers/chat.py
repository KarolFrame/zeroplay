from fastapi import APIRouter
from sqlmodel import Session, select
from app.db import engine, Games
import requests
import os

router = APIRouter()

API_KEY = os.getenv("OPENROUTER_API_KEY")

@router.post("/chat")
def chat_ai(data: dict):
    message = data.get("message", "")
    with Session(engine) as session:
        games = session.exec(select(Games)).all()

    games_text = "\n".join([
        f"{g.name} – {g.genre or 'no genre'} – {g.description or ''}"
        for g in games
    ])

    prompt = f"""
You are a videogame expert assistant.
ONLY recommend games from this list:

{games_text}

The user says:
"{message}"

If you cannot find a suitable recommendation, ask for more details.
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "meta-llama/llama-3-8b-instruct",
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
    )

    json_response = response.json()

    if "choices" not in json_response:
        return {
            "response": "⚠️ AI error: model did not return a valid response.",
            "details": json_response
        }

    return {
        "response": json_response["choices"][0]["message"]["content"]
    }
