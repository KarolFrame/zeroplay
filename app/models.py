from typing import Optional
from sqlmodel import SQLModel, Field
import json

class Games(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    genre: Optional[str] = None
    platform: Optional[str] = None
    publisher: Optional[str] = None
    developer: Optional[str] = None
    release_date: Optional[str] = None
    game_url: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    rank: Optional[int] = None
    tags: Optional[str] = "[]"

    def tags_list(self):
        try:
            return json.loads(self.tags) if self.tags else []
        except:
            return []