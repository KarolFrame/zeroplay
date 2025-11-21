from fastapi import APIRouter
from sqlmodel import Session, select
from app.db import engine, Games
import google.generativeai as genai
import os

router = APIRouter()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("models/gemini-pro")

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
    You are a helpful assistant specialized in video games.
    You can ONLY recommend games from this list:
    {games_text}

    The user says:
    "{message}"

    Respond naturally and clearly.
    If you cannot find a suitable game, ask for more details.
    """

    response = model.generate_content(prompt)

    return {"response": response.text}
