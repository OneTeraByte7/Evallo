import React from "react";

function getLevelColor(level) {
  switch (level) {
    case "error":
      return "border-red-600 bg-red-100 dark:bg-red-900";
    case "warn":
      return "border-yellow-500 bg-yellow-100 dark:bg-yellow-900";
    case "info":
      return "border-blue-600 bg-blue-100 dark:bg-blue-900";
    case "debug":
      return "border-gray-600 bg-gray-100 dark:bg-gray-700";
    default:
      return "border-gray-400 bg-gray-50 dark:bg-gray-800";
  }
}

export default function LogList({ logs }) {
  if (!logs.length) return <p className="p-4">No logs found.</p>;

  return (
    <div className="mt-4 space-y-4 max-h-[70vh] overflow-auto overflow-x-auto">
      {logs.map((log) => (
        <div
          key={log.traceId + log.spanId + log.timestamp}
          className={`p-4 rounded-md border-l-4 ${getLevelColor(log.level)} dark:text-white`}
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold capitalize">{log.level}</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {new Date(log.timestamp).toLocaleString()}
            </span>
          </div>
          <p className="mt-1 whitespace-pre-wrap break-words text-gray-900 dark:text-gray-100">
            {log.message}
          </p>
          <div className="text-xs mt-2 text-gray-700 dark:text-gray-400">
            Resource: {log.resourceId} | Trace: {log.traceId} | Span: {log.spanId} | Commit: {log.commit}
          </div>
        </div>
      ))}
    </div>
  );
}
