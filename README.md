Architecture Overview

The system follows a real-time, event-driven architecture using WebSockets for low-latency communication between the client and server.

Frontend (React)
        │
   WebSocket Connection
        │
Backend (Node.js)
        │
Matchmaking Queue + Room Management
        │
SQLite (for logging)
Key Components:
Frontend (React):
Handles UI, user interactions, and WebSocket communication.
WebSocket Layer:
Maintains persistent bidirectional communication between client and server.
Backend (Node.js):
Manages user sessions, matchmaking, chat rooms, and message routing.
Matchmaking Service:
Maintains a queue of waiting users and pairs them randomly.
Room Management:
Ensures one active chat session per user using in-memory mappings.
Database (SQLite):
Stores chat and message logs (optional persistence).
Matchmaking & Chat Flow
User connects → assigned temporary userId
        ↓
User clicks "Start Chat"
        ↓
Added to matchmaking queue
        ↓
If another user available → match created
        ↓
Room initialized with two users
        ↓
Real-time messaging begins
        ↓
User actions:
   - Send message → forwarded to partner
   - Skip → room destroyed, both re-queued
   - Disconnect → partner notified, room cleaned
Key Behaviors:
Only one active chat per user
Users are matched randomly from queue
Messages are exchanged in real-time via WebSockets
On disconnect:
Partner is notified instantly
Room is removed
Remaining user can re-enter queue
Deployment Approach
Frontend
Deployed on Vercel

Uses environment variable:

VITE_WS_URL=wss://<backend-url>
Backend
Deployed on Render / Railway
Runs a persistent WebSocket server
Uses ws:// locally and wss:// in production
Steps:
Push frontend code to GitHub
Deploy frontend on Vercel
Set environment variable for backend WebSocket URL
Deploy backend on Render/Railway
Ensure WebSocket connection uses secure protocol (wss://)

Known Limitations
In-memory matchmaking:
Queue and room data are stored in memory, limiting scalability to a single server.
No authentication:
Users are anonymous with temporary session IDs only.
No persistence for sessions:
Active chats are not recoverable after server restart.
Limited moderation:
No filtering or abuse detection implemented.
No horizontal scaling:
Would require Redis or distributed state management for multi-server support.
