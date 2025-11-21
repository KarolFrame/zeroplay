from typing import Optional, List
from pydantic import BaseModel
from sqlmodel import SQLModel, Session, select


class GameCreate(SQLModel):
    name: str
    genre: Optional[str] = None
    platform: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None

class GameRead(GameCreate):
    id: int
    rank: Optional[int] = None
    publisher: Optional[str] = None
    developer: Optional[str] = None
    release_date: Optional[str] = None
    year: Optional[int] = None
    game_url: Optional[str] = None
    tags: List[str] = []
