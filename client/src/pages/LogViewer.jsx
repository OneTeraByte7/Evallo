import React, { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import LogList from "../components/LogList";

export default function LogViewer() {
  const [filters, setFilters] = useState({
    message: "",
    level: "",
    resourceId: "",
    timestamp_start: "",
    timestamp_end: "",
  });
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  // Fetch logs once
  useEffect(() => {
    fetch("http://localhost:5000/logs")
      .then((res) => res.json())
      .then(setLogs)
      .catch(console.error);
  }, []);

  // Filter logs when logs or filters change
  useEffect(() => {
    let result = [...logs];

    if (filters.message)
      result = result.filter((log) =>
        log.message.toLowerCase().includes(filters.message.toLowerCase())
      );

    if (filters.level)
      result = result.filter((log) => log.level === filters.level);

    if (filters.resourceId)
      result = result.filter((log) =>
        log.resourceId.toLowerCase().includes(filters.resourceId.toLowerCase())
      );

    if (filters.timestamp_start) {
      const start = new Date(filters.timestamp_start);
      result = result.filter((log) => new Date(log.timestamp) >= start);
    }

    if (filters.timestamp_end) {
      const end = new Date(filters.timestamp_end);
      result = result.filter((log) => new Date(log.timestamp) <= end);
    }

    // Sort reverse chronological
    result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredLogs(result);
  }, [logs, filters]);

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
        Log Ingestion and Querying System
      </h1>

      <FilterBar filters={filters} setFilters={setFilters} />

      <LogList logs={filteredLogs} />
    </div>
  );
}
