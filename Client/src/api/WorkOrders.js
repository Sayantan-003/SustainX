const API_BASE = import.meta.env.VITE_API_BASE;

// POST: Create a new work order
export async function createWorkOrder(data) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/workorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    let responseData = null;
    const text = await res.text();

    try {
      responseData = text ? JSON.parse(text) : null;
    } catch {
      responseData = text || null;
    }

    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));
    console.log("Response data:", responseData);

    if (res.status === 401) {
      console.error("Authentication error - token:", token);
      return {
        ok: false,
        status: 401,
        data: null,
        message: "Authentication failed. Please try logging in again.",
      };
    }

    return {
      ok: res.ok,
      status: res.status,
      data: responseData,
      message: res.ok
        ? responseData?.message || "Work order created successfully"
        : responseData?.error ||
          responseData?.message ||
          `Failed with status ${res.status}`,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: err.message || "Network error",
      message: "Network error. Please try again.",
    };
  }
}
