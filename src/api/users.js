const BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Fetches all users from the JSONPlaceholder API.
 * @returns {Promise<Array>} Array of user objects
 */
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
