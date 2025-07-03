import React, { useState, useEffect } from "react";

const levels = ["error", "warn", "info", "debug"];

export default function FilterBar({ filters, setFilters }) {
  const [localSearch, setLocalSearch] = useState(filters.message || "");

  // Debounce search input to avoid too many calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((f) => ({ ...f, message: localSearch }));
    }, 400);
    return () => clearTimeout(handler);
  }, [localSearch, setFilters]);

  return (
    <div className="bg-white/20 dark:bg-gray-900/40 backdrop-blur-sm p-4 rounded-md shadow-md flex flex-wrap gap-4 items-end">
      {/* Search */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Search Message</label>
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search logs..."
          className="rounded border px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Level */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Level</label>
        <select
          value={filters.level || ""}
          onChange={(e) => setFilters((f) => ({ ...f, level: e.target.value }))}
          className="rounded border px-3 py-2 w-32 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Levels</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* ResourceId */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Resource ID</label>
        <input
          type="text"
          value={filters.resourceId || ""}
          onChange={(e) => setFilters((f) => ({ ...f, resourceId: e.target.value }))}
          placeholder="Filter by resource ID"
          className="rounded border px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Timestamp Start */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">Start Timestamp</label>
        <input
          type="datetime-local"
          value={filters.timestamp_start || ""}
          onChange={(e) => setFilters((f) => ({ ...f, timestamp_start: e.target.value }))}
          className="rounded border px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Timestamp End */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">End Timestamp</label>
        <input
          type="datetime-local"
          value={filters.timestamp_end || ""}
          onChange={(e) => setFilters((f) => ({ ...f, timestamp_end: e.target.value }))}
          className="rounded border px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  );
}
