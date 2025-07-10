const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api`;

export async function getSuggestions(query) {
  const res = await fetch(`${API_BASE}/suggest?query=${encodeURIComponent(query)}`);
  return res.json();
}
