from fastapi import APIRouter
from sqlmodel import Session, select
from app.db import engine, Games
import google.generativeai as genai
import os

router = APIRouter()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

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
    You are a helpful assistant specialized in videogames.
    You must ONLY recommend games from the following list:
    {games_text}

    The user says:
    "{message}"

    Respond in a natural, friendly, and clear way.
    If no game fits the user's request, ask for more details.
    Do NOT create or recommend games that are not in the list.
    """

    response = model.generate_content(prompt)

    return {"response": response.text}
