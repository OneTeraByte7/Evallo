import React, { useState, useEffect, useRef } from "react";
import FilterBar from "./components/FilterBar";
import LogList from "./components/LogList";
import Aurora from "./components/Aurora";
import AnalyticsChart from "./components/AnalyticsChart"; 

export default function App() {
  // Theme toggle logic
  const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  
  const [filters, setFilters] = useState({
    message: "",
    level: "",
    resourceId: "",
    timestamp_start: "",
    timestamp_end: "",
  });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      setError("");
      try {
        const query = new URLSearchParams();
        Object.entries(filters).forEach(([key, val]) => {
          if (val) query.append(key, val);
        });

        const res = await fetch(`http://localhost:5000/logs?${query.toString()}`);

        if (!res.ok) throw new Error(`Failed to fetch logs: ${res.status}`);

        const data = await res.json();
        setLogs(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, [filters]);

  
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "new_log") {
          
          setLogs((prevLogs) => [msg.data, ...prevLogs]);
        }
      } catch (e) {
        console.error("WebSocket message parse error:", e);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <>
      
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
        rel="stylesheet"
      />

      {/* Inline styles for theme */}
      <style>
        {`
          html {
            font-family: 'Poppins', sans-serif;
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          [data-theme="dark"] {
            background-color: #1a202c;
            color: #f7fafc;
          }
          [data-theme="light"] {
            background-color: #fff;
            color: #000;
          }
          button:focus {
            outline: 2px solid #22c55e;
            outline-offset: 2px;
          }
        `}
      </style>


      <div className="relative min-h-screen overflow-hidden">
        
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Aurora />
        </div>

        {/* Main content sits above the Aurora */}
        <div className="relative z-10 min-h-screen flex flex-col p-6">
       
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleTheme}
              className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-md text-sm font-semibold"
            >
              {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <h1
            className="text-3xl font-bold mb-6 text-center"
            style={{
              color: "#A3FF84",
              textShadow: "0 0 8px #7CFF00, 0 0 15px #7CFF00",
            }}
          >
            Log Query Interface
          </h1>

          <FilterBar filters={filters} setFilters={setFilters} />

          {/* Add Analytics Chart here */}
          <div className="my-6 bg-gray-100 dark:bg-gray-800 rounded-md p-4 shadow-md">
            <AnalyticsChart logs={logs} />
          </div>

          {loading && <p className="mt-4 text-center">Loading logs...</p>}
          {error && <p className="mt-4 text-center text-red-600">{error}</p>}
          {!loading && !error && <LogList logs={logs} />}
        </div>
      </div>
    </>
  );
}
