const API_BASE = "http://localhost:5000/api";

export async function getSuggestions(query) {
  const res = await fetch(`${API_BASE}/suggest?query=${encodeURIComponent(query)}`);
  return res.json();
}
