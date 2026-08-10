function UserList({
  users,
  currentUser,
  selectedUser,
  onSelectUser,
}) {
  const otherUsers =
    users.filter(
      (user) =>
        user._id !== currentUser._id
    )

  return (
    <>
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h2 className="font-bold text-lg text-slate-800">
          Users
        </h2>

        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
          {otherUsers.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {otherUsers.length === 0 && (
          <div className="p-6 text-center text-sm text-slate-500">
            No other users.
            <br />
            Open another browser window
            to test.
          </div>
        )}

        {otherUsers.map((user) => {
          const isSelected =
            selectedUser?._id ===
            user._id

          return (
            <button
              key={user._id}
              onClick={() =>
                onSelectUser(user)
              }
              className={`w-full p-4 flex items-center gap-3 text-left border-b border-slate-100 hover:bg-indigo-50 transition ${
                isSelected
                  ? "bg-indigo-50"
                  : "bg-white"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  user.online
                    ? "bg-green-500"
                    : "bg-slate-300"
                }`}
              />

              <div className="min-w-0">
                <p className="font-semibold text-slate-800 truncate">
                  {user.username}
                </p>

                <p className="text-xs text-slate-500">
                  {user.online
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </>
  )
}

export default UserList