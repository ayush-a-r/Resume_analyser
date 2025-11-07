# ai_service/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_logic   import router as resume_router
from ai_chat    import router as chat_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your Vite dev URL
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(chat_router)
