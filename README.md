# 🌟 Real-Time Log Query Interface

A sleek React app with Tailwind CSS that lets you **query**, **filter**, and **view logs** in real time — powered by WebSockets and featuring a stunning aurora background. It also includes a separate page for **analytics visualization** of your logs.

---

---

## ✨ Features

### 🔄 Real-Time Log Ingestion
- Uses **WebSocket** to stream logs as they are received on the backend.
- No need to refresh the page — logs appear instantly when added.

### 🔍 Advanced Filtering
- Filter logs based on:
  - `message` (text search)
  - `level` (`error`, `warn`, `info`, `debug`)
  - `resourceId`
  - `timestamp` range (start & end)

### 🌙 / ☀️ Dark & Light Theme
- Toggle between light and dark modes.
- Uses **Poppins** font and smooth transitions.
- Preference is saved using `localStorage`.

### 🧠 Modular Component Architecture
- Built with reusable components:
  - `FilterBar` for inputs
  - `LogList` for display

### 📦 Fullstack Ready (Client + Server)
- Fetches logs via `GET /logs`.
- Accepts new logs via `POST /logs`.
- WebSocket server broadcasts new log data to connected clients.

---

✅ This setup ensures a **modern**, **real-time**, and **developer-friendly** logging dashboard.

---

## 🎁 Bonus Additions

Beyond the assessment requirements, this project includes **enhanced features** to deliver a more intuitive and immersive experience:

- **🌈 Aurora Background Animation**  
  A GPU-accelerated WebGL-based dynamic aurora animation (`Aurora.jsx`) runs smoothly behind all UI components, adding a futuristic, visually appealing flair.

- **📡 Real-Time Log Streaming (WebSocket Integration)**  
  Logs are pushed in real time from the backend to the frontend via WebSocket, enabling immediate visibility of new logs without manual refresh or polling.

- **📊 Dedicated Analytics Dashboard Page**  
  A standalone page shows log trends using charts built with **Recharts**, including:
  - Count of logs by level (`error`, `warn`, `info`, `debug`)
  - Dynamic updates based on filtered time range

- **🎨 Theme Persistence**  
  The light/dark theme selection is persisted using `localStorage` so users enjoy a consistent experience across sessions.

- **⚡ Smooth Animations + UX**  
  Animations and transitions are added for theme toggle and components, enhancing user interaction and engagement.

---

These improvements demonstrate attention to detail, performance, and real-world usability — going beyond just functionality into **developer polish**. ✨

## 📁 Project Structure

/src
├── App.jsx # Main app component handling theme, filters, logs, WebSocket
├── /components
│ ├── FilterBar.jsx # Controls UI for filtering logs
│ ├── LogList.jsx # Displays filtered logs list
│ ├── Aurora.jsx # Background WebGL aurora animation
│ └── AnalyticsChart.jsx # Chart component showing log analytics
└── /pages
└── AnalyticsPage.jsx # Separate page for analytics view


---

## ⚙️ Setup & Run

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/real-time-log-query.git
    ```
2.**Install Depemdancies**
  ```bash
  cd server/
  node server.js

  cd client/
  npm start
  ```

## 🔧 How It Works
The frontend fetches logs from /logs endpoint filtered by your inputs.
When a new log is POSTed to the backend, it broadcasts the log via WebSocket to all connected clients.
Clients receive new log events and prepend them to the logs list dynamically.
Filters are reactive — changing them refetches logs.
The Analytics page aggregates log counts by level and renders visual charts to show trends.

## 🙌 Acknowledgements
React & Tailwind CSS for rapid frontend development
OGL/WebGL for aurora animation magic
Chart.js / Recharts for analytics visualization
WebSocket protocol for real-time log streaming


