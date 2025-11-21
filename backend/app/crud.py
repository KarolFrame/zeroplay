from typing import List, Optional
from sqlmodel import select, Session
from app.models import Games

def query_games(session: Session,
                genre: Optional[str] = None,
                platform: Optional[str] = None,
                tags: Optional[List[str]] = None,
                q: Optional[str] = None) -> List[Games]:
    stmt = select(Games)

    if genre:
        stmt = stmt.where(Games.genre.ilike(f"%{genre}%"))
    if platform:
        stmt = stmt.where(Games.platform.ilike(f"%{platform}%"))
    if q:
        like = f"%{q}%"
        stmt = stmt.where((Games.name.ilike(like)) | (Games.description.ilike(like)))

    results = session.exec(stmt).all()

    if tags:
        filtered = []
        for game in results:
            jt = game.tags_list()
            if all(t.lower() in [x.lower() for x in jt] for t in tags):
                filtered.append(game)
        return filtered

    return results