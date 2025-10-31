// hooks/useWorkOrders.js
import { useState, useEffect } from "react";
import { getAllWorkOrders } from "../api/WorkOrders.js";

export default function useWorkOrders() {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  // Fetch work orders from API
  const fetchWorkOrders = async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getAllWorkOrders(params);
      
      if (result.ok) {
        // Transform MongoDB data to match frontend format
        const transformedData = result.data.map((wo) => ({
          id: wo._id,
          title: wo.title || "",
          description: wo.description || "",
          category: wo.category || "",
          priority: wo.priority || "Low",
          status: wo.status || "Open",
          startDate: wo.startDate,
          dueDate: wo.dueDate,
          duration: wo.duration || 0,
          asset: wo.asset || "",
          location: wo.location || "",
          primaryAssignee: wo.primaryAssignee || "",
          team: wo.team || "",
          additionalAssignees: wo.additionalAssignees || "",
          signatureRequired: wo.signatureRequired || false,
          photos: wo.photos || [],
          checklists: wo.checklists || [],
          createdAt: wo.createdAt,
          updatedAt: wo.updatedAt,
        }));
        
        setWorkOrders(transformedData);
        setPagination(result.pagination);
      } else {
        setError(result.message || "Failed to fetch work orders");
        setWorkOrders([]);
      }
    } catch (err) {
      console.error("Error fetching work orders:", err);
      setError("An error occurred while fetching work orders");
      setWorkOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch work orders on component mount
  useEffect(() => {
    fetchWorkOrders();
  }, []);

  // Add new work order (optimistic update + refetch)
  const addWorkOrder = async (workOrder) => {
    // Optimistically add to local state
    setWorkOrders((prev) => [workOrder, ...prev]);
    
    // Refetch to get the actual data from server
    await fetchWorkOrders();
  };

  // Update work order
  const updateWorkOrder = async (id, updatedData) => {
    setWorkOrders((prev) =>
      prev.map((wo) => (wo.id === id ? { ...wo, ...updatedData } : wo))
    );
    
    // Optionally refetch to sync with server
    await fetchWorkOrders();
  };

  // Delete work order
  const deleteWorkOrder = async (id) => {
    setWorkOrders((prev) => prev.filter((wo) => wo.id !== id));
    
    // Optionally refetch to sync with server
    await fetchWorkOrders();
  };

  return {
    workOrders,
    loading,
    error,
    pagination,
    fetchWorkOrders,
    addWorkOrder,
    updateWorkOrder,
    deleteWorkOrder,
  };
}