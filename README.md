# Private Chat Application

A simple one-to-one real-time chat application built using React, Tailwind CSS, Node.js, Express, Socket.io and MongoDB.

## Features

- Username-based login
- One-to-one private chat
- Real-time messaging
- Socket.io
- Message history
- MongoDB message storage
- Message timestamps
- Online/offline status
- Typing indicator
- REST APIs
- Responsive interface
- Error handling

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Socket.io Client

### Backend

- Node.js
- Express
- Socket.io
- MongoDB
- Mongoose

## Project Structure

```text
private-chat-app/

├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── socket/
│   │   ├── db.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   ├── socket.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
└── README.md