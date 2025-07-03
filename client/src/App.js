import { useEffect, useState } from "react";

function App() {
  // Check localStorage first, then system preference, fallback to light
  const getInitialTheme = () => {
    if (typeof window === "undefined") return "light"; // SSR safe
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    // system preference fallback
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme attribute and localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle handler
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {/* Import Poppins font globally */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <style>
        {`
          html {
            font-family: 'Poppins', sans-serif;
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          [data-theme="dark"] {
            background-color: #1a202c; /* Tailwind gray-900 */
            color: #f7fafc; /* Tailwind gray-50 */
          }
          [data-theme="light"] {
            background-color: #fff;
            color: #000;
          }
          button:focus {
            outline: 2px solid #22c55e; /* Tailwind green-500 */
            outline-offset: 2px;
          }
        `}
      </style>

      <div className="min-h-screen transition-colors duration-300 flex flex-col">
        <div className="p-4 flex justify-end">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark and light theme"
            className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <main className="flex-grow flex items-center justify-center px-4">
          <h1 className="text-4xl font-bold text-green-500 dark:text-green-400 text-center">
            Theme Toggle + Poppins Font Working ✅
          </h1>
        </main>
      </div>
    </>
  );
}

export default App;
