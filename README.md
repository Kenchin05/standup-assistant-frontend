#  AI Standup Assistant – Frontend (Next.js + TypeScript + Tailwind)

This is the frontend interface for the **AI Standup Assistant** project.  
It provides a clean, modern dashboard for managing teams, submitting standups,  
viewing AI insights, and exploring insights about productivity trends.

---

# Features

### Core Screens
- Login / Register
- Dashboard (Standup(editable) + Team Summary)
- Team Management (Overview, Members, Join/Create)
- History Page (Edit/Delete standups)
- Insights Page (Charts + Metrics)

### UI Highlights
- Fully responsive
- Modern card-based layout
- Consistent design system (Cards, Buttons, Inputs)

### Analytics
- Vagueness trend chart
- Tone distribution pie chart
- Metrics counters
- AI-generated insights summary

---

#  Installation & Setup

## 1️⃣ Clone repository

```bash
git clone https://github.com/Kenchin05/standup-assistant-frontend.git
cd standup-assistant-frontend
```

---

## 2️⃣ Install dependencies

```bash
npm install
```

---

## 3️⃣ Create `.env.local`

### env.example

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 4️⃣ Run locally

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

# App Structure

```
/app
  /login
  /register
  /dashboard
     /team
     /history
     /insights
/components
/lib (axios client, auth store)
```

---

# API Usage

API calls are handled via Axios:

```ts
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

---

# AI Feedback & Insights Explanation

### 1. Standup Form
Whenever a user submits their standup:
- The backend sends it to LangChain
- AI returns:
  - key tasks
  - tone
  - vagueness score
  - suggestion

Displayed inside a card.

---

### 2. Team Summary Card
Shows:
- 1-paragraph team summary  
- Common blockers  
- Collaboration suggestions  
- Risks  

Fetched from:  
```
GET /api/team/summary
```

---

### 3. Insights Dashboard
Displays:
- Charts (Recharts)
- AI-generated narrative
- Trend metrics

Follows the theme of minimal, clean data representation.

---

# Screenshots

Add your own screenshots:

```
/public/screens/dashboard.png
/public/screens/history.png
/public/screens/insights.png
```


---


