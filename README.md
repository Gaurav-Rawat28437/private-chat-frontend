# Private Chat Frontend

A clean and responsive one-to-one real-time chat application built with React, Vite, Tailwind CSS, and Socket.io Client.

The frontend connects to a Node.js + Express backend and uses Socket.io for instant real-time messaging.

## Live Application

https://private-chat-frontend.vercel.app/

## Backend

Live Backend API:

https://private-chat-backend-gucm.onrender.com

Backend Repository:

https://github.com/Gaurav-Rawat28437/private-chat-backend

## Features

- Username-based login
- One-to-one private chat
- Real-time messaging
- Socket.io communication
- Previous message history
- Message timestamps
- Online/offline user status
- Typing indicator
- Responsive UI
- API error handling
- Socket connection handling
- Vercel deployment

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Socket.io Client

## Project Structure

```text
private-chat-frontend/
│
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── UserList.jsx
│   │   ├── ChatWindow.jsx
│   │   └── Message.jsx
│   │
│   ├── utils/
│   │   ├── api.js
│   │   └── socket.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md