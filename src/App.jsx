import { useEffect, useState } from "react"

import Login from "./components/Login"
import ChatWindow from "./components/ChatWindow"
import UserList from "./components/UserList"

import socket from "./utils/socket"

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser =
      localStorage.getItem("currentUser")

    return savedUser
      ? JSON.parse(savedUser)
      : null
  })

  const [selectedUser, setSelectedUser] =
    useState(() => {
      const savedUser =
        localStorage.getItem("selectedUser")

      return savedUser
        ? JSON.parse(savedUser)
        : null
    })

  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!currentUser) {
      return
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

        const freshUser =
          updatedUsers.find(
            (user) =>
              user._id ===
              oldSelectedUser._id
          )

        if (!freshUser) {
          localStorage.removeItem(
            "selectedUser"
          )

          return null
        }

        localStorage.setItem(
          "selectedUser",
          JSON.stringify(freshUser)
        )

        return freshUser
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
    setCurrentUser(user)

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    )
  }

  function handleSelectUser(user) {
    setSelectedUser(user)

    localStorage.setItem(
      "selectedUser",
      JSON.stringify(user)
    )
  }

  function handleLogout() {
    localStorage.removeItem(
      "currentUser"
    )

    localStorage.removeItem(
      "selectedUser"
    )

    setCurrentUser(null)
    setSelectedUser(null)
    setUsers([])
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
              <h1 className="text-xl font-bold text-slate-800">
                Private Chat
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                {currentUser.username}
              </p>
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
          onSelectUser={handleSelectUser}
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