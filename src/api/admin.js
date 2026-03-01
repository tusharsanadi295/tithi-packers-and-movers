const API = "http://localhost:5000/api/admin";

export async function fetchDashboardStats() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Dashboard fetch failed");

  return res.json();
}
