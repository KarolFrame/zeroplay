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
⚠️ IMPORTANT RULES:
- Respond in 80 words or less.
- Recommend ONLY 3 games maximum.
- Choose the BEST matches, not the whole list.
- Keep answers SHORT and friendly.
- Never repeat games.
- If you cannot find a good match, ask for more details.
If you cannot find a suitable recommendation, ask for more details.
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "mistralai/Mistral-7B-Instruct-v0.2",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "max_tokens":120,
            "temperature": 0.7
        }
    )
    response_json = response.json()
    print("OPENROUTER RAW RESPONSE:", response_json)

    if "choices" not in response_json:
        return {"response": "AI could not generate a response."}

    return {"response": response_json["choices"][0]["message"]["content"]}
