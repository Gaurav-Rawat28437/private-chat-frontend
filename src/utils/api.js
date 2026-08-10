const API_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:8080";

async function request(endpoint, options = {}) {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong"
      );
    }

    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}

export async function createUser(username) {
  return request("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
    }),
  });
}

export async function getUsers() {
  return request("/api/users");
}

export async function getMessages(user1, user2) {
  return request(
    `/api/messages/${user1}/${user2}`
  );
}

export async function sendMessage(
  sender,
  receiver,
  text
) {
  return request("/api/messages", {
    method: "POST",
    body: JSON.stringify({
      sender,
      receiver,
      text,
    }),
  });
}