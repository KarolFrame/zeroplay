from fastapi import FastAPI, Depends, Query, HTTPException
from typing import List, Optional
from sqlmodel import Session, select
from fastapi.middleware.cors import CORSMiddleware

from app.db import init_db, get_session, create_db_and_tables, engine
from app.crud import query_games
from app.models import Games
from app.schemas import GameRead
import json

app = FastAPI(title="Games API catalog")

create_db_and_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/api/games", response_model=List[GameRead])
def api_juegos(
    genre: Optional[str] = None,
    platform: Optional[str] = None,
    tags: Optional[str] = Query(None, description="Comma separated"),
    q: Optional[str] = None,
    session: Session = Depends(get_session),
):
    tags_list = tags.split(",") if tags else None
    games = query_games(session, genre, platform, tags_list=tags_list, q=q)
    return games

@app.get("/api/games/{game_id}", response_model=GameRead)
def get_game(game_id: int, session: Session = Depends(get_session)):
    game = session.get(Games, game_id)
    
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    game_data = game.dict() 
    if game_data.get('tags') and isinstance(game_data['tags'], str):
        try:
            game_data['tags'] = json.loads(game_data['tags'])
        except json.JSONDecodeError:
            game_data['tags'] = []
    return game_data

@app.get("/api/top5", response_model=List[GameRead])
def get_top5_games(session: Session = Depends(get_session)):
    statement = select(Games).where(Games.rank != None).order_by(Games.rank.asc()).limit(10)
    games = session.exec(statement).all()

    games_list = []
    for game in games:
        game_data = game.dict()
        game_data['tags'] = game.tags_list()
        if game.release_date:
            try:
                game_data['year'] = int(game.release_date.split("-")[0])
            except:
                game_data['year'] = None
        else:
            game_data['year'] = None
        games_list.append(game_data)

    return games_list

@app.get("/api/latest5", response_model=List[GameRead])
def get_latest5_games(session: Session = Depends(get_session)):
    statement = select(Games).where(Games.release_date != None).order_by(Games.release_date.desc()).limit(10)
    games = session.exec(statement).all()

    games_list = []
    for game in games:
        game_data = game.dict()
        game_data['tags'] = game.tags_list()
        if game.release_date:
            try:
                game_data['year'] = int(game.release_date.split("-")[0])
            except:
                game_data['year'] = None
        else:
            game_data['year'] = None
        games_list.append(game_data)

    return games_list

@app.get("/api/games/{game_id}/related", response_model=List[GameRead])
def get_related_games(game_id: int, session: Session = Depends(get_session)):
    main_game = session.get(Games, game_id)
    if not main_game:
        return []

    try:
        if main_game.tags and isinstance(main_game.tags, str):
            target_tags = json.loads(main_game.tags)
        else:
            target_tags = []
    except json.JSONDecodeError:
        target_tags = []

    if not target_tags:
        return []

    tag_conditions = [Games.tags.like(f'%"{tag}"%') for tag in target_tags]

    if not tag_conditions:
        return []

    or_clause = tag_conditions[0]
    
    for condition in tag_conditions[1:]:
        or_clause |= condition

    statement = (
        select(Games)
        .where(or_clause)
        .where(Games.id != game_id)
        .limit(3)
    )
    
    related_games = session.exec(statement).all()

    games_list = []
    for game in related_games:
        game_data = game.dict()
        if game.tags and isinstance(game.tags, str):
            try:
                game_data['tags'] = json.loads(game.tags)
            except json.JSONDecodeError:
                game_data['tags'] = []
        games_list.append(game_data)
        
    return games_list

@app.get("/games")
def get_games(
    title: str | None = None,
    genre: str | None = None,
    platform: str | None = None,
    tags: str | None = None,
    session: Session = Depends(get_session)
):

    query = select(Games)

    if title:
        words = title.strip().split()
        for word in words:
            query = query.where(Games.name.ilike(f"%{word}%"))

    if genre:
        query = query.where(Games.genre == genre)

    if platform:
        query = query.where(Games.platform == platform)

    if tags:
        tag_list = [t.strip() for t in tags.split(",")]
        for tag in tag_list:
            query = query.where(Games.tags.contains(f'"{tag}"'))

    return session.exec(query).all()

@app.get("/debug/games")
def list_games():
    with Session(engine) as session:
        games = session.exec(select(Games)).all()
        return games[:20]