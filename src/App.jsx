import { useEffect, useState } from "react"

import Login from "./components/Login"
import UserList from "./components/UserList"
import ChatWindow from "./components/ChatWindow"

import socket from "./utils/socket"

function App() {
  const [currentUser, setCurrentUser] =
    useState(() => {
      const savedUser =
        localStorage.getItem("chatUser")

      return savedUser
        ? JSON.parse(savedUser)
        : null
    })

  const [users, setUsers] =
    useState([])

  const [selectedUser, setSelectedUser] =
    useState(null)

  useEffect(() => {
    if (!currentUser) {
      return
    }

    if (!socket.connected) {
      socket.connect()
    }

    socket.emit("user:join", {
      userId: currentUser._id
    })

    function handleUsersUpdate(
      updatedUsers
    ) {
      setUsers(updatedUsers)

      setSelectedUser((oldSelectedUser) => {
        if (!oldSelectedUser) {
          return null
        }

        return (
          updatedUsers.find(
            (user) =>
              user._id ===
              oldSelectedUser._id
          ) || oldSelectedUser
        )
      })
    }

    socket.on(
      "users:update",
      handleUsersUpdate
    )

    return () => {
      socket.off(
        "users:update",
        handleUsersUpdate
      )
    }
  }, [currentUser])

  function handleLogin(user) {
    localStorage.setItem(
      "chatUser",
      JSON.stringify(user)
    )

    setCurrentUser(user)
  }

  function handleLogout() {
    localStorage.removeItem("chatUser")

    socket.disconnect()

    setCurrentUser(null)
    setUsers([])
    setSelectedUser(null)
  }

  if (!currentUser) {
    return (
      <Login
        onLogin={handleLogin}
      />
    )
  }

  return (
    <div className="h-screen bg-slate-100 flex">
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-5 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">
                Logged in as
              </p>

              <h1 className="font-bold text-slate-800">
                {currentUser.username}
              </h1>
            </div>

            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <UserList
          users={users}
          currentUser={currentUser}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
      </aside>

      <ChatWindow
        currentUser={currentUser}
        selectedUser={selectedUser}
      />
    </div>
  )
}

export default App