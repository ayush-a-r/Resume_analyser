# ai_service/ai_chat.py
import os, pathlib, json, google.generativeai as genai
from collections import defaultdict, deque
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from dotenv import load_dotenv

HERE = pathlib.Path(__file__).resolve().parent
load_dotenv(HERE / ".env")
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("models/gemini-2.0-flash")
router = APIRouter()
MEM = defaultdict(lambda: deque(maxlen=12))

@router.websocket("/chat/{session_id}")
async def chat_ws(ws: WebSocket, session_id: str):
    await ws.accept()
    print("connection open")
    try:
        while True:
            user_msg = await ws.receive_text()  # ← Already plain text
            MEM[session_id].append({"role": "user", "parts": [{"text": user_msg}]})
            resp = model.generate_content(list(MEM[session_id]))
            answer = resp.text.strip()
            MEM[session_id].append({"role": "model", "parts": [{"text": answer}]})
            await ws.send_text(answer)
    except WebSocketDisconnect:
        print("connection closed")