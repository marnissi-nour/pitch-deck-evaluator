<div align="center">

# 🎯 Pitch Deck Evaluator

**AI-powered pitch deck feedback — scored like a VC would.**

[🚀 Live Demo](https://pitch-deck-evaluator-production.up.railway.app) · [📽️ Watch Demo](https://github.com/marnissi-nour/pitch-deck-evaluator/blob/main/demo.mp4) · [📄 Presentation](https://github.com/marnissi-nour/pitch-deck-evaluator/blob/main/presentation.pdf)

![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?style=flat-square&logo=node.js&logoColor=white)
![Mistral AI](https://img.shields.io/badge/Mistral_AI-Large-FF7000?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Deploy](https://img.shields.io/badge/Deployed-Railway-6366f1?style=flat-square)

</div>

---

## What is this?

Upload a pitch deck PDF or paste your slide content — and get instant, investor-grade feedback in under 30 seconds. The AI evaluates your deck the way a seasoned VC would: direct, specific, and scored across three critical dimensions.

> Built with **Mistral AI** (`mistral-large-latest`) · Lightweight Node.js proxy · Zero dependencies

---

## 🚀 Try it live

**👉 [pitch-deck-evaluator-production.up.railway.app](https://pitch-deck-evaluator-production.up.railway.app)**

No setup, no account — open and go.

---

## 📽️ Demo

[![Watch the demo](https://img.shields.io/badge/▶_Watch_Demo-black?style=for-the-badge)](https://github.com/marnissi-nour/pitch-deck-evaluator/blob/main/demo.mp4)

---

## ✨ Features

| | |
|---|---|
| 📄 **PDF upload or text paste** | Drop a deck PDF or paste slide content directly |
| 📊 **3-dimension AI scoring** | Clarity · Narrative · Problem–solution fit |
| 💡 **Investor-grade feedback** | Strengths, weaknesses, and insights per dimension |
| 🏁 **Overall verdict** | Would a VC take the next meeting? |
| ⚡ **Zero dependencies** | Pure Node.js stdlib — no `npm install` needed |

---

## 📁 Repository Structure

```
pitch-deck-evaluator/
├── solution/
│   ├── index.html        # Frontend — PDF upload, text paste, results view
│   ├── server.js         # Node.js proxy — forwards requests to Mistral API
    └── package.json      # Start script for deployment
├── demo.mp4              # Screen recording demo
├── presentation.pdf      # Project presentation slides
└── README.md
```

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
Mistral AI  (mistral-large-latest)
      │
      └─ JSON response → rendered results in browser
```

The server is a lightweight proxy that keeps the API key off the client. The frontend sends the full messages array; the server forwards it to Mistral and returns the structured JSON response.

---

## 💻 Run Locally

**Prerequisites:** Node.js v16+

```bash
# Clone the repo
git clone https://github.com/marnissi-nour/pitch-deck-evaluator.git
cd pitch-deck-evaluator/solution

# Start the server
node server.js

# Open in your browser
# → http://localhost:3000
```

No `npm install`, no API key setup — just run and go.

---

## 📊 Scoring Rubric

| Score | Tier |
|:---:|---|
| **8–10** | 🟢 Exceptional — Airbnb / Dropbox tier |
| **6–7** | 🟡 Solid — investable with minor gaps |
| **4–5** | 🟠 Average — notable weaknesses |
| **1–3** | 🔴 Needs major rework |

---

## 🛠️ Tech Stack

- **Frontend** — Vanilla HTML / CSS / JS, no framework
- **Backend** — Node.js (`http` + `https` stdlib only)
- **AI** — [Mistral AI](https://mistral.ai/) `mistral-large-latest`
- **Hosting** — [Railway](https://railway.app)

---

<div align="center">

Made by [marnissi-nour](https://github.com/marnissi-nour)

</div>
