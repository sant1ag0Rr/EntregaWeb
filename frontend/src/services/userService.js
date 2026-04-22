const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

function isUser(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.email === "string"
  );
}

export async function getUsers() {
  const response = await fetch(`${API_BASE_URL}/users`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Users request failed with status ${response.status}`);
  }

  const payload = await response.json();

  if (
    typeof payload !== "object" ||
    payload === null ||
    payload.success !== true ||
    !Array.isArray(payload.data) ||
    !payload.data.every(isUser)
  ) {
    throw new Error("Users response does not match the expected contract.");
  }

  return payload.data.map(({ id, name, email }) => ({
    id,
    name,
    email
  }));
}
