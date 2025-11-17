from .db import engine
from .models import SQLModel, Games
from sqlmodel import Session
import json

def seed():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as s:
        j1 = Games(
            name="Catan",
            type="board",
            players_min=3,
            players_max=4,
            duration_minutes=90,
            dificulty="medium",
            description="Colonization game",
            tags=json.dumps(["strategy","interaction"]),
            image_url="https://x.boardgamearena.net/data/gamemedia/catan/box/en_280.png?h=1751536970",
            font_api="bgg"
        )
        s.add(j1)
        s.commit()

if __name__ == "__main__":
    seed()
