import { useState, useEffect } from "react";

const STORAGE_KEY = "workOrders";

const initialWorkOrders = [
  {
    id: "002",
    title: "Suite B Temp High",
    description: "Perform inspection on HVAC compressor",
    due: "2025-10-06T11:46:00",
    start: "2025-10-01T09:00:00",
    status: "Open",
    priority: "Low",
  },
  {
    id: "001",
    title: "Welcome! Start Here",
    description: "Work Orders are the main way to track maintenance tasks",
    due: "2025-10-06T11:46:00",
    start: "2025-09-25T08:30:00",
    status: "Open",
    priority: "Medium",
  },
];

export default function useWorkOrders() {
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setWorkOrders(JSON.parse(saved));
    } else {
      setWorkOrders(initialWorkOrders);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workOrders));
  }, [workOrders]);

  const addWorkOrder = (wo) => {
    setWorkOrders((prev) => [...prev, wo]);
  };

  return { workOrders, setWorkOrders, addWorkOrder };
}
