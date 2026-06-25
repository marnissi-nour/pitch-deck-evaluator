# 🎯 Pitch Deck Evaluator

An AI-powered pitch deck evaluator that analyzes startup decks with the critical lens of a seasoned venture capital investor — scoring clarity, narrative, and problem–solution fit.

> Built with **Mistral AI** · Runs locally with a lightweight Node.js proxy

---

## 📽️ Demo

https://github.com/user-attachments/assets/YOUR_VIDEO_ID.webm

---

## 📁 Repository Structure

```
pitch-deck-evaluator/
├── solution
    ├──index.html           # Frontend — upload PDF or paste slide text, view AI results
    ├── server.js           # Node.js proxy server — forwards requests to Mistral API
├── demo.webm           # Screen recording demo
├── presentation.pdf    # Project presentation slides
└── README.md
```

---

## ✨ Features

- **PDF upload or text paste** — drop a deck PDF or paste slide content directly
- **3-dimension AI scoring** — Investor communication & clarity · Narrative & storytelling · Problem–solution fit
- **Investor-grade feedback** — strengths, weaknesses, and insights per dimension
- **Overall verdict** — a 3–5 sentence take: would a VC take the next meeting?
- **No external dependencies** — pure Node.js standard library, no npm install needed

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+

### Run locally

```bash
# 1. Clone the repo
git clone https://github.com/marnissi-nour/pitch-deck-evaluator.git
cd pitch-deck-evaluator

# 2. Start the server
node server.js

# 3. Open in your browser
# → http://localhost:3000
```

No `npm install`, no API key setup — just run and go.

---

## 🏗️ How It Works

```
Browser (index.html)
      │
      │  POST /api/analyze  { messages: [...] }
      ▼
Node.js server (server.js)
      │
      │  HTTPS → api.mistral.ai/v1/chat/completions
      ▼
Mistral API  (mistral-large-latest)
      │
      └─ JSON response → rendered results in browser
```

The server acts as a lightweight proxy to keep your API key out of the browser. The frontend sends the full chat messages array; the server forwards it to Mistral and streams the response back.

---

## 📊 Scoring Rubric

| Score | Tier |
|---|---|
| 8–10 | Exceptional — Airbnb / Dropbox tier |
| 6–7 | Solid — investable with minor gaps |
| 4–5 | Average — notable weaknesses |
| 1–3 | Needs major rework |

---

## 🛠️ Tech Stack

- **Frontend** — Vanilla HTML/CSS/JS, no framework
- **Backend** — Node.js (`http` + `https` stdlib only)
- **AI** — [Mistral AI](https://mistral.ai/) `mistral-large-latest`

---

