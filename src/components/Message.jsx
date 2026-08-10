function Message({
  message,
  currentUserId,
}) {
  const isMine =
    message.sender._id ===
    currentUserId

  const time = new Date(
    message.createdAt
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div
      className={`flex ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl ${
          isMine
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"
        }`}
      >
        {!isMine && (
          <p className="text-xs font-semibold mb-1">
            {message.sender.username}
          </p>
        )}

        <p className="break-words leading-relaxed">
          {message.text}
        </p>

        <p
          className={`text-[10px] mt-1 text-right ${
            isMine
              ? "text-indigo-200"
              : "text-slate-400"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  )
}

export default Message