import {
  useEffect,
  useRef,
  useState,
} from "react"

import {
  getMessages,
} from "../utils/api"

import socket from "../utils/socket"

import Message from "./Message"

function ChatWindow({
  currentUser,
  selectedUser,
}) {
  const [messages, setMessages] =
    useState([])

  const [input, setInput] =
    useState("")

  const [typingUser, setTypingUser] =
    useState("")

  const messagesEndRef =
    useRef(null)

  useEffect(() => {
    if (!selectedUser) {
      setMessages([])
      return
    }

    async function loadMessages() {
      try {
        const data =
          await getMessages(
            currentUser._id,
            selectedUser._id
          )

        setMessages(data)
      } catch (error) {
        console.error(
          "Message history error:",
          error.message
        )
      }
    }

    loadMessages()

    socket.emit("chat:join", {
      otherUserId:
        selectedUser._id,
    })
  }, [
    currentUser._id,
    selectedUser,
  ])

  useEffect(() => {
    function handleNewMessage(
      message
    ) {
      if (!selectedUser) {
        return
      }

      const senderId =
        message.sender._id

      const receiverId =
        message.receiver._id

      const isCurrentChat =
        (
          senderId ===
            currentUser._id &&
          receiverId ===
            selectedUser._id
        ) ||
        (
          senderId ===
            selectedUser._id &&
          receiverId ===
            currentUser._id
        )

      if (!isCurrentChat) {
        return
      }

      setMessages(
        (oldMessages) => [
          ...oldMessages,
          message,
        ]
      )
    }

    socket.on(
      "message:new",
      handleNewMessage
    )

    return () => {
      socket.off(
        "message:new",
        handleNewMessage
      )
    }
  }, [
    currentUser._id,
    selectedUser,
  ])

  useEffect(() => {
    function handleTyping(data) {
      if (data.isTyping) {
        setTypingUser(
          data.username
        )
      } else {
        setTypingUser("")
      }
    }

    socket.on(
      "typing:update",
      handleTyping
    )

    return () => {
      socket.off(
        "typing:update",
        handleTyping
      )
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      }
    )
  }, [
    messages,
    typingUser,
  ])

  function handleSend(event) {
    event.preventDefault()

    if (
      !input.trim() ||
      !selectedUser
    ) {
      return
    }

    socket.emit("message:send", {
      receiverId:
        selectedUser._id,
      text: input.trim(),
    })

    setInput("")

    socket.emit("typing:stop", {
      receiverId:
        selectedUser._id,
    })
  }

  function handleTyping(event) {
    const value =
      event.target.value

    setInput(value)

    if (!selectedUser) {
      return
    }

    if (value.trim()) {
      socket.emit("typing:start", {
        receiverId:
          selectedUser._id,
      })
    } else {
      socket.emit("typing:stop", {
        receiverId:
          selectedUser._id,
      })
    }
  }

  if (!selectedUser) {
    return (
      <main className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-5xl">
            💬
          </div>

          <h2 className="text-2xl font-bold text-slate-700 mt-4">
            Select a user
          </h2>

          <p className="mt-2 text-slate-500">
            Select someone from the left
            to start chatting.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 flex flex-col">
      <header className="bg-white border-b border-slate-200 p-4 flex items-center gap-3">
        <span
          className={`w-3 h-3 rounded-full ${
            selectedUser.online
              ? "bg-green-500"
              : "bg-slate-300"
          }`}
        />

        <div>
          <h2 className="font-bold text-slate-800">
            {selectedUser.username}
          </h2>

          <p className="text-xs text-slate-500">
            {selectedUser.online
              ? "Online"
              : "Offline"}
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-2">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-center text-slate-400">
            <div>
              <p className="text-lg">
                No messages yet.
              </p>

              <p className="text-sm mt-1">
                Say hello 👋
              </p>
            </div>
          </div>
        )}

        {messages.map(
          (message) => (
            <Message
              key={message._id}
              message={message}
              currentUserId={
                currentUser._id
              }
            />
          )
        )}

        {typingUser && (
          <div className="text-xs text-slate-500 italic">
            {typingUser} is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="bg-white border-t border-slate-200 p-3 flex gap-3"
      >
        <input
          type="text"
          value={input}
          maxLength={1000}
          onChange={handleTyping}
          placeholder={`Message ${selectedUser.username}...`}
          className="flex-1 px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={!input.trim()}
          className="px-6 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </main>
  )
}

export default ChatWindow