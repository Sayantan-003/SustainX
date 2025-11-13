// api/WorkOrder.js
const API_BASE = import.meta.env.VITE_API_BASE;

// POST: Create a new work order
export async function createWorkOrder(formData) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/workorders`, {
      method: "POST",
      headers: {
        // DON'T set Content-Type for FormData - browser sets it automatically with boundary
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: formData, 
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
    console.error("Network error:", err);
    return {
      ok: false,
      status: 0,
      data: err.message || "Network error",
      message: "Network error. Please try again.",
    };
  }
}

// GET: Fetch all work orders with filters
export async function getAllWorkOrders(params = {}) {
  try {
    const token = localStorage.getItem("accessToken");
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE}/api/workorders${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    const data = await res.json();

    return {
      ok: res.ok,
      status: res.status,
      data: data.data || [],
      pagination: data.pagination,
      message: res.ok ? "Work orders fetched successfully" : data.message,
    };
  } catch (err) {
    console.error("Network error:", err);
    return {
      ok: false,
      status: 0,
      data: [],
      message: "Network error. Please try again.",
    };
  }
}

// GET: Fetch single work order by ID
export async function getWorkOrderById(id) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/workorders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    const data = await res.json();

    return {
      ok: res.ok,
      status: res.status,
      data: data.data || null,
      message: res.ok ? "Work order fetched successfully" : data.message,
    };
  } catch (err) {
    console.error("Network error:", err);
    return {
      ok: false,
      status: 0,
      data: null,
      message: "Network error. Please try again.",
    };
  }
}

// PUT: Update work order
// export async function updateWorkOrder(id, formData) {
//   try {
//     const token = localStorage.getItem("accessToken");

//     const res = await fetch(`${API_BASE}/api/workorders/${id}`, {
//       method: "PUT",
//       headers: {
//         // DON'T set Content-Type for FormData
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       credentials: "include",
//       body: formData,
//     });

//     const data = await res.json();

//     return {
//       ok: res.ok,
//       status: res.status,
//       data: data.data || null,
//       message: res.ok ? "Work order updated successfully" : data.message,
//     };
//   } catch (err) {
//     console.error("Network error:", err);
//     return {
//       ok: false,
//       status: 0,
//       data: null,
//       message: "Network error. Please try again.",
//     };
//   }
// }

// PUT: Update work order
export async function updateWorkOrder(id, formData) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/workorders/${id}`, {
      method: "PUT",
      headers: {
        // DON'T set Content-Type for FormData
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    return {
      ok: res.ok,
      status: res.status,
      data: data.data || null,
      message: res.ok ? "Work order updated successfully" : data.message,
    };
  } catch (err) {
    console.error("Network error:", err);
    return {
      ok: false,
      status: 0,
      data: null,
      message: "Network error. Please try again.",
    };
  }
}

// DELETE: Delete work order
export async function deleteWorkOrder(id) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/workorders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    const data = await res.json();

    return {
      ok: res.ok,
      status: res.status,
      message: res.ok ? "Work order deleted successfully" : data.message,
    };
  } catch (err) {
    console.error("Network error:", err);
    return {
      ok: false,
      status: 0,
      message: "Network error. Please try again.",
    };
  }
}

// GET: Get work order statistics
export async function getWorkOrderStats() {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/workorders/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    const data = await res.json();

    return {
      ok: res.ok,
      status: res.status,
      data: data.data || null,
      message: res.ok ? "Statistics fetched successfully" : data.message,
    };
  } catch (err) {
    console.error("Network error:", err);
    return {
      ok: false,
      status: 0,
      data: null,
      message: "Network error. Please try again.",
    };
  }
}