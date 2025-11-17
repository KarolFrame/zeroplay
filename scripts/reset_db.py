from sqlmodel import SQLModel
from app.db import init_db, engine

SQLModel.metadata.drop_all(engine)

init_db()
print("reset db")
