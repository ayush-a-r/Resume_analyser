# ai_service/ai_logic.py  ← the only router you need for “analyse”
import os, pathlib, tempfile, shutil
from dotenv import load_dotenv
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import google.generativeai as genai
from PyPDF2 import PdfReader     # ← new dep:  pip install PyPDF2

HERE = pathlib.Path(__file__).resolve().parent
load_dotenv(HERE / ".env")
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL = genai.GenerativeModel("models/gemini-2.0-flash")
router = APIRouter()

# ───────────────────────── helpers ──────────────────────────
def pdf_to_text(upload: UploadFile) -> str:
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    shutil.copyfileobj(upload.file, tmp)
    tmp.close()

    reader = PdfReader(tmp.name)
    pages = [p.extract_text() or "" for p in reader.pages]
    if not any(pages):
        raise HTTPException(400, "Could not read text from PDF")

    return "\n\n".join(pages)

# ───────────────────────── route ────────────────────────────
@router.post("/resume/analyze")                # keep old path
async def analyze(file: UploadFile = File(...)):
    resume_text = pdf_to_text(file)

    prompt = [
        {
            "role": "user",
            "parts": [{
                "text": (
                    "You are a professional resume reviewer. "
                    "Return exactly five bullet-point improvements, no intro or outro.\n\n"
                    f"Resume:\n{resume_text}"
                )
            }]
        }
    ]

    resp = MODEL.generate_content(prompt)
    return JSONResponse({"suggestions": resp.text})