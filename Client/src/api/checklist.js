// api/Checklist.js
const API_BASE = import.meta.env.VITE_API_BASE;

// Helper function to handle API responses
const handleResponse = async (res) => {
  let responseData = null;
  const text = await res.text();

  try {
    responseData = text ? JSON.parse(text) : null;
  } catch {
    responseData = text || null;
  }

  if (res.status === 401) {
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
    data: responseData?.data || responseData,
    pagination: responseData?.pagination,
    message: res.ok
      ? responseData?.message || "Operation successful"
      : responseData?.error || responseData?.message || `Failed with status ${res.status}`,
  };
};

// POST: Create a new checklist
export async function createChecklist(checklistData) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/checklists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify(checklistData),
    });

    return await handleResponse(res);
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

// GET: Fetch all checklists with filters
export async function getAllChecklists(params = {}) {
  try {
    const token = localStorage.getItem("accessToken");
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE}/api/checklists${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    return await handleResponse(res);
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

// GET: Fetch single checklist by ID
export async function getChecklistById(id) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/checklists/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    return await handleResponse(res);
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

// PUT: Update checklist
export async function updateChecklist(id, checklistData) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/checklists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify(checklistData),
    });

    return await handleResponse(res);
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

// DELETE: Delete checklist
export async function deleteChecklist(id) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/checklists/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("Network error:", err);
    return {
      ok: false,
      status: 0,
      message: "Network error. Please try again.",
    };
  }
}

// PATCH: Toggle task completion
export async function toggleTaskCompletion(checklistId, taskId) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/checklists/${checklistId}/tasks/${taskId}/toggle`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    return await handleResponse(res);
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

// POST: Add task to checklist
export async function addTask(checklistId, taskData) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/checklists/${checklistId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify(taskData),
    });

    return await handleResponse(res);
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

// PUT: Update task in checklist
export async function updateTask(checklistId, taskId, taskData) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/checklists/${checklistId}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify(taskData),
    });

    return await handleResponse(res);
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

// DELETE: Delete task from checklist
export async function deleteTask(checklistId, taskId) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/checklists/${checklistId}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    return await handleResponse(res);
  } catch (err) {
    console.error("Network error:", err);
    return {
      ok: false,
      status: 0,
      message: "Network error. Please try again.",
    };
  }
}

// POST: Duplicate checklist
export async function duplicateChecklist(id) {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/checklists/${id}/duplicate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    return await handleResponse(res);
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

// GET: Get checklist statistics
export async function getChecklistStats() {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE}/api/checklists/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    return await handleResponse(res);
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