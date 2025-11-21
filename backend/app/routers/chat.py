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

    # Cargar juegos
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

    data = response.json()
    return {"response": data["choices"][0]["message"]["content"]}
