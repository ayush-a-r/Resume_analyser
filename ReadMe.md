# Resume Analyzer 🧠📄

A GenAI-powered web application that analyzes user-uploaded resumes and provides intelligent feedback. The platform also includes a chatbot to assist users with resume-related queries.

## 🌐 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **AI Microservice**: Python, LangChain, Google Gemini API
- **Database**: PostgreSQL
- **Others**: Multer, JWT, pdf-parse, Docker

## 🔑 Features

- Upload resumes securely (PDF format)
- Extract structured data from resumes
- Get AI-powered feedback using LLMs
- Integrated chatbot for resume tips and user queries
- Access control using JWT authentication

## 🛠️ Installation

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm start
```

### Python Microservice

```bash
cd ai_service
pip install -r requirements.txt
python app.py
```

## 📸 Screenshots

### Dashboard View
![Dashboard](screenshots/dashboard.png)

### Resume Upload
![Upload](screenshots/upload.png)

### Chatbot
![Chatbot](screenshots/chatbot.png)

> 📁 Place screenshots inside a `screenshots/` folder at the root level.

## 📄 License

This project is licensed under the MIT License.
