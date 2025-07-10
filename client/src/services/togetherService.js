const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api`;

export async function getAIInsights(person) {
  try {
    const res = await fetch(`${API_BASE}/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: person.name,
        description: person.description,
      }),
    });

    const data = await res.json();
    return data.output;
  } catch (err) {
    console.error("Error fetching AI insights:", err);
    return null;
  }
}
