from sqlmodel import Session, delete
from app.db import engine, create_db_and_tables
from app.models import Games
import requests
import time
import json

create_db_and_tables()

API_URL = "https://www.freetogame.com/api/games"

def fetch_games():
    print("Descargando juegos FreeToPlay...")
    res = requests.get(API_URL)
    res.raise_for_status()
    return res.json()

def seed():
    data = fetch_games()
    print(f"Insertando {len(data)} juegos...")

    with Session(engine) as session:
        session.exec(delete(Games))
        for i, g in enumerate(data):
            tags_list = []
            if g.get("genre"):
                tags_list.append(g["genre"])
            if g.get("platform"):
                tags_list.extend([p.strip() for p in g["platform"].split(",")])
            
            game = Games(
                id=g["id"],
                name=g["title"],
                description=g.get("short_description", ""),
                image_url=g.get("thumbnail", ""),
                genre=g.get("genre", ""),
                platform=g.get("platform", ""),
                publisher=g.get("publisher", ""),
                developer=g.get("developer", ""),
                release_date=g.get("release_date", ""),
                game_url=g.get("game_url", ""),
                rank=i+1,
                tags=json.dumps(tags_list)
            )
            session.add(game)
            print(f"{i+1}/{len(data)} - {game.name} | Tags: {tags_list}")

        session.commit()

    print("Seed completado ✔")


if __name__ == "__main__":
    seed()
