# ✨ Talent Meet – Full-Stack Interview Platform ✨

Talent Meet is a full‑stack technical interview platform that enables real-time coding interviews, video calls, and automated evaluation in a single, seamless interface.

Here is the live link for the application [Click here](https://talent-meet-2mtib.sevalla.app/)


## ✨ Key Features

- 🧑‍💻 **VSCode-like Code Editor** for an intuitive coding experience  
- 🔐 **Authentication with Clerk** for secure user management  
- 🎥 **1-on-1 Video Interview Rooms** with live audio and video  
- 🧭 **Dashboard with Live Stats** for monitoring sessions and activity  
- 🔊 **Mic & Camera Toggle, Screen Sharing & Recording** for flexible collaboration  
- 💬 **Real-time Chat Messaging** during interviews  
- ⚙️ **Secure Code Execution** in an isolated environment  
- 🎯 **Auto Feedback** (Success / Fail) based on test cases  
- 🎉 **Confetti on Success & Notifications on Fail** for instant visual feedback  
- 🧩 **Practice Problems Page** for solo coding sessions  
- 🔒 **Room Locking** to strictly allow only 2 participants  
- 🧠 **Background Jobs with Inngest** for async processing  
- 🧰 **REST API with Node.js & Express** on the backend  
- ⚡ **Data Fetching & Caching via TanStack Query** on the frontend  
- 🤖 **CodeRabbit Integration** for PR review and code quality checks  
- 🧑‍💻 **Git & GitHub Workflow** with branches, PRs, and merges  
- 🚀 **Deployment on Sevalla** (friendly for free-tier hosting)[2]

***

## 🧪 Environment Variables Setup

### Backend (`/backend`)

Create a `.env` file in the `backend` directory:

```bash
PORT=3000
NODE_ENV=development

DB_URL=your_mongodb_connection_url

INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

CLIENT_URL=http://localhost:5173
```

### Frontend (`/frontend`)

Create a `.env` file in the `frontend` directory:

```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

VITE_API_URL=http://localhost:3000/api

VITE_STREAM_API_KEY=your_stream_api_key
```

Change the `CLIENT_URL` and `VITE_API_URL` environment variables when move to production

***

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

The backend will start on the port defined in `PORT` (default: 3000)

***

## 🔧 Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will typically start on `http://localhost:5173`
