import { useEffect, useState } from "react";

import Login from "./components/Login";
import UserList from "./components/UserList";
import ChatWindow from "./components/ChatWindow";

import { getUsers } from "./utils/api";
import socket from "./utils/socket";

function App() {
  const [currentUser, setCurrentUser] =
    useState(null);

  const [users, setUsers] =
    useState([]);

  const [selectedUser, setSelectedUser] =
    useState(null);

  useEffect(() => {
    function handleUsersUpdate(
      updatedUsers
    ) {
      setUsers(updatedUsers);
    }

    socket.on(
      "users:update",
      handleUsersUpdate
    );

    return () => {
      socket.off(
        "users:update",
        handleUsersUpdate
      );
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    socket.emit("user:join", {
      userId: currentUser._id,
    });

    async function loadUsers() {
      try {
        const data = await getUsers();

        setUsers(data);
      } catch (error) {
        console.error(
          "Users error:",
          error.message
        );
      }
    }

    loadUsers();
  }, [currentUser]);

  function handleLogin(user) {
    setCurrentUser(user);
    setSelectedUser(null);
  }

  function handleSelectUser(user) {
    setSelectedUser(user);
  }

  if (!currentUser) {
    return (
      <Login
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="h-screen bg-slate-100 flex">
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-5 border-b">
          <h1 className="text-xl font-bold">
            Private Chat
          </h1>

          <p className="text-sm text-slate-500">
            Logged in as{" "}
            {currentUser.username}
          </p>
        </div>

        <UserList
          users={users}
          currentUser={currentUser}
          selectedUser={selectedUser}
          onSelectUser={
            handleSelectUser
          }
        />
      </aside>

      <ChatWindow
        currentUser={currentUser}
        selectedUser={selectedUser}
      />
    </div>
  );
}

export default App;