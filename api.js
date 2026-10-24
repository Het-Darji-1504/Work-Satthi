/* Configure this after deploying the API. Keep this file public: never put secrets here. */
window.WORK_SATTHI_API_URL = window.WORK_SATTHI_API_URL || "https://YOUR-BACKEND-SERVICE.onrender.com";
async function apiRequest(path, options = {}) {
  const base = String(window.WORK_SATTHI_API_URL || "").replace(/\/$/, "");
  if (!base || base.includes("YOUR-BACKEND-SERVICE")) {
    throw new Error("The backend has not been deployed or connected yet. Use the Deploy backend instructions on this page, then set WORK_SATTHI_API_URL in api.js.");
  }
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const token = localStorage.getItem("workSatthiToken");
  if (token) headers.Authorization = "Bearer " + token;
  let response;
  try {
    response = await fetch(base + path, { ...options, headers });
  } catch (_error) {
    throw new Error("Could not connect to the backend. Check that the API is deployed and its CORS origin includes this website.");
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed. Please try again.");
  return data;
}
